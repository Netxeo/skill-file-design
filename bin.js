#!/usr/bin/env node

import { intro, outro, select, text, spinner, isCancel, cancel } from '@clack/prompts';
import pc from 'picocolors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import clipboard from 'clipboardy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read file safely
const readFile = (filePath) => {
  try {
    return fs.readFileSync(path.join(__dirname, filePath), 'utf8');
  } catch (error) {
    console.warn(pc.yellow(`Warning: Could not read ${filePath}`));
    return '';
  }
};

let trendFiles = [];
try {
  trendFiles = fs.readdirSync(path.join(__dirname, 'content/design-trends')).filter(f => f.endsWith('.md'));
} catch (e) {}

// Simple heuristic matching for "Other"
function findBestMatch(input) {
  if (!input) return null;
  const words = input.toLowerCase().match(/\w+/g) || [];
  let bestMatch = null;
  let maxScore = 0;
  
  for (const file of trendFiles) {
    const fileWords = file.toLowerCase().replace('.md', '').replace(/^\d+-/, '').split('-');
    let score = 0;
    for (const w of words) {
      if (fileWords.includes(w)) score += 2;
      else if (w.length > 3 && fileWords.some(fw => fw.includes(w) || w.includes(fw))) score += 1;
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = file;
    }
  }
  return bestMatch;
}

// ----------------------------------------------------------------------
// CORRELATION LOGIC
// ----------------------------------------------------------------------
const industryCorrelations = {
  '01-digital-saas-ui.md': { moods: ['31-core-aesthetics.md', '38-typography-and-layout-art.md', '26-3d-and-motion-design.md'], subcultures: ['42-advanced-ui-and-ux-concepts.md', 'none'] },
  '02-ecommerce-and-retail.md': { moods: ['23-cinematic-and-photography.md', '38-typography-and-layout-art.md', '21-retro-and-nostalgia.md'], subcultures: ['24-global-cultures.md', '43-print-and-street-art.md', 'none'] },
  '03-creative-portfolios.md': { moods: ['35-experimental-and-anti-ux.md', '22-maximalism-and-brutalism.md', '38-typography-and-layout-art.md'], subcultures: ['43-print-and-street-art.md', '36-japanese-pop-culture.md', 'none'] },
  '04-web3-and-crypto.md': { moods: ['26-3d-and-motion-design.md', '22-maximalism-and-brutalism.md', '29-analog-and-vintage-tech.md'], subcultures: ['33-scifi-and-speculative.md', '40-niche-subcultures-and-cores.md'] },
  '05-editorial-and-magazine.md': { moods: ['38-typography-and-layout-art.md', '23-cinematic-and-photography.md', '30-classical-fine-art.md'], subcultures: ['43-print-and-street-art.md', 'none'] },
  '06-entertainment-and-media.md': { moods: ['23-cinematic-and-photography.md', '26-3d-and-motion-design.md', '21-retro-and-nostalgia.md'], subcultures: ['36-japanese-pop-culture.md', '33-scifi-and-speculative.md'] },
  '07-dashboards-and-data.md': { moods: ['31-core-aesthetics.md', '38-typography-and-layout-art.md', '26-3d-and-motion-design.md'], subcultures: ['42-advanced-ui-and-ux-concepts.md', 'none'] },
  '08-healthcare-and-medical.md': { moods: ['31-core-aesthetics.md', '38-typography-and-layout-art.md'], subcultures: ['42-advanced-ui-and-ux-concepts.md', 'none'] },
  '09-education-and-edtech.md': { moods: ['31-core-aesthetics.md', '25-illustration-and-2d-art.md'], subcultures: ['none'] },
  '10-travel-and-hospitality.md': { moods: ['23-cinematic-and-photography.md', '30-classical-fine-art.md', '38-typography-and-layout-art.md'], subcultures: ['24-global-cultures.md', 'none'] },
  'custom': { moods: ['31-core-aesthetics.md', '38-typography-and-layout-art.md', '35-experimental-and-anti-ux.md'], subcultures: ['42-advanced-ui-and-ux-concepts.md', 'none'] }
};

const moodCorrelations = {
  '31-core-aesthetics.md': ['42-advanced-ui-and-ux-concepts.md', 'none'],
  '22-maximalism-and-brutalism.md': ['43-print-and-street-art.md', '40-niche-subcultures-and-cores.md', '36-japanese-pop-culture.md'],
  '21-retro-and-nostalgia.md': ['40-niche-subcultures-and-cores.md', '36-japanese-pop-culture.md', '43-print-and-street-art.md'],
  '23-cinematic-and-photography.md': ['24-global-cultures.md', '33-scifi-and-speculative.md', 'none'],
  '26-3d-and-motion-design.md': ['33-scifi-and-speculative.md', '42-advanced-ui-and-ux-concepts.md', '36-japanese-pop-culture.md'],
  '35-experimental-and-anti-ux.md': ['43-print-and-street-art.md', '40-niche-subcultures-and-cores.md'],
  '30-classical-fine-art.md': ['24-global-cultures.md', 'none'],
  '29-analog-and-vintage-tech.md': ['33-scifi-and-speculative.md', '40-niche-subcultures-and-cores.md'],
  '38-typography-and-layout-art.md': ['43-print-and-street-art.md', '42-advanced-ui-and-ux-concepts.md'],
  '25-illustration-and-2d-art.md': ['36-japanese-pop-culture.md', '40-niche-subcultures-and-cores.md', '43-print-and-street-art.md'],
  'custom': ['42-advanced-ui-and-ux-concepts.md', 'none']
};

const labelsMap = {
  '31-core-aesthetics.md': 'Clean, Modern, Corporate',
  '22-maximalism-and-brutalism.md': 'Maximalism & Brutalism (Aggressive, bold)',
  '21-retro-and-nostalgia.md': 'Retro & Nostalgia',
  '23-cinematic-and-photography.md': 'Cinematic & Photography',
  '26-3d-and-motion-design.md': '3D & Motion Heavy',
  '35-experimental-and-anti-ux.md': 'Experimental & Anti-UX',
  '30-classical-fine-art.md': 'Classical Fine Art & Elegant',
  '29-analog-and-vintage-tech.md': 'Analog & Vintage Tech',
  '38-typography-and-layout-art.md': 'Typography & Layout Art (Text-heavy)',
  '25-illustration-and-2d-art.md': 'Illustration & 2D Art',
  
  '40-niche-subcultures-and-cores.md': 'Niche Subcultures (Cyberpunk, Cottagecore...)',
  '36-japanese-pop-culture.md': 'Japanese Pop Culture / Anime',
  '24-global-cultures.md': 'Global Cultures / Ethnic',
  '33-scifi-and-speculative.md': 'Sci-Fi & Speculative Future',
  '42-advanced-ui-and-ux-concepts.md': 'Advanced UI/UX Concepts',
  '43-print-and-street-art.md': 'Print & Street Art',
  'none': 'None (Keep it pure)'
};

const allMoods = Object.keys(moodCorrelations).filter(m => m !== 'custom');
const allSubcultures = Object.keys(labelsMap).filter(k => k.startsWith('4') || k === '36-japanese-pop-culture.md' || k === '24-global-cultures.md' || k === '33-scifi-and-speculative.md' || k === 'none');

const checkCancel = (val) => {
  if (isCancel(val)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }
}

async function main() {
  console.clear();
  intro(pc.bgMagenta(pc.white(' 🎨 Autonomous Art Director CLI ')));

  // --- 1. INDUSTRY ---
  let industry = await select({
    message: 'What industry is this project for?',
    options: [
      { value: '01-digital-saas-ui.md', label: 'SaaS & Digital Products' },
      { value: '02-ecommerce-and-retail.md', label: 'E-commerce & Retail' },
      { value: '03-creative-portfolios.md', label: 'Creative Portfolio / Agency' },
      { value: '04-web3-and-crypto.md', label: 'Web3 & Crypto' },
      { value: '05-editorial-and-magazine.md', label: 'Editorial & Magazine' },
      { value: '06-entertainment-and-media.md', label: 'Entertainment & Media' },
      { value: '07-dashboards-and-data.md', label: 'Dashboards & Data-heavy apps' },
      { value: '08-healthcare-and-medical.md', label: 'Healthcare & Medical' },
      { value: '09-education-and-edtech.md', label: 'Education & EdTech' },
      { value: '10-travel-and-hospitality.md', label: 'Travel & Hospitality' },
      { value: 'other', label: 'Other (Type it manually)' },
    ],
  });
  checkCancel(industry);

  let customIndustryText = '';
  if (industry === 'other') {
    customIndustryText = await text({
      message: 'Describe your industry:',
      placeholder: 'e.g. AI Legal Tech, Vintage Watch Shop...',
    });
    checkCancel(customIndustryText);
    const match = findBestMatch(customIndustryText);
    if (match) {
      industry = match;
      console.log(pc.green(`   => Auto-matched to database: ${pc.bold(labelsMap[match] || match)}`));
    } else {
      industry = 'custom';
    }
  }

  // --- 2. MOOD ---
  let mood = await select({
    message: 'What is the core mood or aesthetic?',
    options: [
      { value: 'auto', label: '✨ Recommend for me (Based on Industry)' },
      { value: 'friction', label: '🎲 Force deliberate contrast (Anti-Match / Awwwards Style)' },
      { value: '31-core-aesthetics.md', label: labelsMap['31-core-aesthetics.md'] },
      { value: '22-maximalism-and-brutalism.md', label: labelsMap['22-maximalism-and-brutalism.md'] },
      { value: '21-retro-and-nostalgia.md', label: labelsMap['21-retro-and-nostalgia.md'] },
      { value: '23-cinematic-and-photography.md', label: labelsMap['23-cinematic-and-photography.md'] },
      { value: '26-3d-and-motion-design.md', label: labelsMap['26-3d-and-motion-design.md'] },
      { value: '35-experimental-and-anti-ux.md', label: labelsMap['35-experimental-and-anti-ux.md'] },
      { value: '30-classical-fine-art.md', label: labelsMap['30-classical-fine-art.md'] },
      { value: '29-analog-and-vintage-tech.md', label: labelsMap['29-analog-and-vintage-tech.md'] },
      { value: '38-typography-and-layout-art.md', label: labelsMap['38-typography-and-layout-art.md'] },
      { value: 'other', label: 'Other (Type it manually)' },
    ],
  });
  checkCancel(mood);

  let customMoodText = '';
  if (mood === 'other') {
    customMoodText = await text({ message: 'Describe the mood:' });
    checkCancel(customMoodText);
    const match = findBestMatch(customMoodText);
    if (match) { 
      mood = match; 
      console.log(pc.green(`   => Auto-matched to database: ${pc.bold(labelsMap[match] || match)}`)); 
    } else { 
      mood = 'custom'; 
    }
  } else if (mood === 'auto') {
    const recommendedMoods = industryCorrelations[industry]?.moods || industryCorrelations['custom'].moods;
    const moodChoice = await select({
      message: 'Based on your industry, here are the best matching aesthetics:',
      options: [
        ...recommendedMoods.map(m => ({ value: m, label: labelsMap[m] || m })),
        { value: 'surprise', label: 'Surprise me! (Pick one of these for me)' }
      ]
    });
    checkCancel(moodChoice);
    if (moodChoice === 'surprise') {
      mood = recommendedMoods[Math.floor(Math.random() * recommendedMoods.length)];
      console.log(pc.magenta(`   => The AI selected: ${pc.bold(labelsMap[mood] || mood)}`));
    } else {
      mood = moodChoice;
    }
  } else if (mood === 'friction') {
    const recommendedMoods = industryCorrelations[industry]?.moods || industryCorrelations['custom'].moods;
    const frictionMoods = allMoods.filter(m => !recommendedMoods.includes(m));
    mood = frictionMoods[Math.floor(Math.random() * frictionMoods.length)];
    console.log(pc.red(`   => 🎲 Friction Engine activated. Deliberate contrast selected: ${pc.bold(labelsMap[mood] || mood)}`));
  }

  // --- 3. SUBCULTURE ---
  let subculture = await select({
    message: 'Any specific target audience or subculture to blend in?',
    options: [
      { value: 'auto', label: '✨ Recommend for me (Based on Industry + Mood)' },
      { value: 'friction', label: '🎲 Force deliberate contrast (Anti-Match / Awwwards Style)' },
      { value: 'none', label: labelsMap['none'] },
      { value: '40-niche-subcultures-and-cores.md', label: labelsMap['40-niche-subcultures-and-cores.md'] },
      { value: '36-japanese-pop-culture.md', label: labelsMap['36-japanese-pop-culture.md'] },
      { value: '24-global-cultures.md', label: labelsMap['24-global-cultures.md'] },
      { value: '33-scifi-and-speculative.md', label: labelsMap['33-scifi-and-speculative.md'] },
      { value: '42-advanced-ui-and-ux-concepts.md', label: labelsMap['42-advanced-ui-and-ux-concepts.md'] },
      { value: '43-print-and-street-art.md', label: labelsMap['43-print-and-street-art.md'] },
      { value: 'other', label: 'Other (Type it manually)' },
    ],
  });
  checkCancel(subculture);

  let customSubcultureText = '';
  if (subculture === 'other') {
    customSubcultureText = await text({ message: 'Describe the subculture:' });
    checkCancel(customSubcultureText);
    const match = findBestMatch(customSubcultureText);
    if (match) { 
      subculture = match; 
      console.log(pc.green(`   => Auto-matched to database: ${pc.bold(labelsMap[match] || match)}`)); 
    } else { 
      subculture = 'custom'; 
    }
  } else if (subculture === 'auto') {
    const indSubcultures = industryCorrelations[industry]?.subcultures || industryCorrelations['custom'].subcultures;
    const moodSubcultures = moodCorrelations[mood] || moodCorrelations['custom'];
    
    let recommendedSubcultures = indSubcultures.filter(s => moodSubcultures.includes(s));
    
    if (recommendedSubcultures.length === 0) {
      recommendedSubcultures = [...new Set([...indSubcultures, ...moodSubcultures])];
    }

    if (recommendedSubcultures.length === 1 && recommendedSubcultures[0] === 'none') {
      console.log(pc.dim('   => Based on Industry + Mood, no specific subculture is needed. Keeping it pure.'));
      subculture = 'none';
    } else {
      const subChoice = await select({
        message: 'Based on your industry & mood, here are the best matching subcultures:',
        options: [
          ...recommendedSubcultures.map(s => ({ value: s, label: labelsMap[s] || s })),
          { value: 'surprise', label: 'Surprise me! (Pick one for me)' }
        ]
      });
      checkCancel(subChoice);
      if (subChoice === 'surprise') {
        subculture = recommendedSubcultures[Math.floor(Math.random() * recommendedSubcultures.length)];
        console.log(pc.magenta(`   => The AI selected: ${pc.bold(labelsMap[subculture] || subculture)}`));
      } else {
        subculture = subChoice;
      }
    }
  } else if (subculture === 'friction') {
    const indSubcultures = industryCorrelations[industry]?.subcultures || industryCorrelations['custom'].subcultures;
    const frictionSubcultures = allSubcultures.filter(s => !indSubcultures.includes(s) && s !== 'none');
    subculture = frictionSubcultures[Math.floor(Math.random() * frictionSubcultures.length)];
    if (!subculture) subculture = '36-japanese-pop-culture.md'; // Fallback
    console.log(pc.red(`   => 🎲 Friction Engine activated. Shock-value subculture selected: ${pc.bold(labelsMap[subculture] || subculture)}`));
  }

  // --- 4. AMBITION LEVEL ---
  const ambition = await select({
    message: 'What is the ambition level / polish requirement for this design?',
    options: [
      { value: 'mvp', label: 'MVP (Clean, Fast, Accessible UI, Standard Layouts)' },
      { value: 'premium', label: 'Premium (Micro-interactions, high polish, perfect spacing)' },
      { value: 'awwwards', label: 'Awwwards Level (Creative layouts, highly disruptive, complex)' }
    ]
  });
  checkCancel(ambition);

  // --- 5. TECH STACK ---
  const framework = await select({
    message: 'Which Frontend Framework?',
    options: [
      { value: 'React / Next.js', label: 'React / Next.js' },
      { value: 'Vue / Nuxt', label: 'Vue / Nuxt' },
      { value: 'Svelte / SvelteKit', label: 'Svelte / SvelteKit' },
      { value: 'Vanilla HTML/JS', label: 'Vanilla HTML/JS' },
      { value: 'other', label: 'Other' },
    ]
  });
  checkCancel(framework);

  const styling = await select({
    message: 'Which Styling approach?',
    options: [
      { value: 'Tailwind CSS', label: 'Tailwind CSS' },
      { value: 'Vanilla CSS / SCSS', label: 'Vanilla CSS / SCSS' },
      { value: 'CSS Modules', label: 'CSS Modules' },
      { value: 'other', label: 'Other' },
    ]
  });
  checkCancel(styling);

  const animation = await select({
    message: 'Which Animation library?',
    options: [
      { value: 'GSAP', label: 'GSAP (Recommended for complex UI)' },
      { value: 'Framer Motion', label: 'Framer Motion' },
      { value: 'CSS Only', label: 'CSS Only' },
      { value: 'Three.js / WebGL', label: 'Three.js / WebGL' },
      { value: 'none', label: 'None' },
    ]
  });
  checkCancel(animation);

  const s = spinner();
  s.start('Assembling your Art Director System Prompt & copying to clipboard...');

  // 1. Load ALL Core Rules
  const coreAntiAi = readFile('content/core/00-anti-ai-design.md');
  const coreUiLaws = readFile('content/core/01-ui-laws-and-systems.md');
  const coreUxHuman = readFile('content/core/02-ux-human-psychology.md');
  const coreCreativeTech = readFile('content/core/03-creative-technologies.md');

  // 2. Load Selected Modules
  const industryContent = industry === 'custom' 
    ? `USER CUSTOM INDUSTRY DIRECTIVE:\nThe project targets this custom industry: "${customIndustryText}". Apply relevant visual language.`
    : readFile(`content/design-trends/${industry}`);

  const moodContent = mood === 'custom'
    ? `USER CUSTOM MOOD DIRECTIVE:\nThe core aesthetic must be: "${customMoodText}". Innovate to match this vibe.`
    : readFile(`content/design-trends/${mood}`);

  let subcultureContent = '';
  if (subculture === 'custom') {
    subcultureContent = `USER CUSTOM SUBCULTURE DIRECTIVE:\nTarget audience/culture: "${customSubcultureText}". Blend this seamlessly into the UI.`;
  } else if (subculture !== 'none') {
    subcultureContent = readFile(`content/design-trends/${subculture}`);
  }

  // 3. Assemble Dynamic Constraints based on ambition
  let ambitionText = '';
  if (ambition === 'awwwards') {
    ambitionText = 'AWWWARDS LEVEL: Push the boundaries of web design. Use asymmetrical or complex CSS Grids, aggressive scroll animations, and unconventional layouts. You are allowed to break standard UX rules if it enhances the creative impact.';
  } else if (ambition === 'premium') {
    ambitionText = 'PREMIUM LEVEL: Focus on extremely polished micro-interactions, flawless typography scaling, subtle gradients, glassmorphism (if applicable), and an overall high-end luxury feel.';
  } else {
    ambitionText = 'MVP LEVEL: Keep the layout standard, accessible, and fast to build. However, apply the required aesthetic perfectly through typography, spacing, and color choices.';
  }

  // 4. Merge everything
  const finalPrompt = `
# SYSTEM ROLE: AUTONOMOUS ART DIRECTOR & SENIOR FRONTEND DEV

Your primary objective is to **GENERATE SPECTACULAR, PRODUCTION-READY DESIGN AND CODE**. You are not just a passive consultant; you are the creator. You must build sites, apps, and assets that strictly DO NOT look like they were generated by AI. 

To achieve this, you must rigorously apply the variables and constraints chosen below.

---
## 1. TECH STACK CONSTRAINTS
- **Framework:** ${framework}
- **Styling:** ${styling}
- **Animation:** ${animation}
CRITICAL: Write the actual code using this exact stack. Do not hallucinate or use libraries that are not listed here.

---
## 2. AMBITION & COMPLEXITY
- **Target Polish Level:** ${ambition.toUpperCase()}
- **Directive:** ${ambitionText}

---
## 3. CORE DESIGN CONSTRAINTS (MANDATORY)
You MUST respect these 4 core pillars to eradicate the "AI Look". Read them and apply them to every line of CSS/Code you write.

### 3.1 ANTI-AI DESIGN LAWS
${coreAntiAi}

### 3.2 UI LAWS & SYSTEMS
${coreUiLaws}

### 3.3 UX & HUMAN PSYCHOLOGY
${coreUxHuman}

### 3.4 CREATIVE TECHNOLOGIES
${coreCreativeTech}

---
## 4. AESTHETIC DIRECTIVES
### 4.1 INDUSTRY CONTEXT
${industryContent}

### 4.2 MOOD & AESTHETIC
${moodContent}

${subculture !== 'none' ? `### 4.3 SUBCULTURE / TARGET AUDIENCE\n${subcultureContent}` : ''}

---
# 🚀 INTERACTIVE WORKFLOW INSTRUCTIONS

1. **CODE GENERATION:** When the user asks you to create a layout, component, or page, you must immediately generate the code. Fuse the Industry, Mood, and Subculture seamlessly while strictly enforcing the Anti-AI Design Laws.
2. **ASSET COLLABORATION (MIDJOURNEY / DALL-E 3):** 
   - NEVER use generic gray placeholder boxes or generic Unsplash images.
   - When you need a specific image/asset to elevate the design, **PAUSE your coding process**.
   - Provide the user with a highly detailed, perfect prompt for Midjourney V6 (or DALL-E 3) tailored exactly to the Aesthetic and Mood chosen above.
   - Tell the user: *"I need an asset here. Please generate it using this prompt on Midjourney, and give me the file path/URL. I will wait before continuing."*
   - Once the user provides the asset, resume your work and integrate it into the code.
3. **ITERATION:** Work step-by-step with the user. If you need another asset later, ask for it using the exact same interactive method. You are co-producing this design together.
  `.trim();

  // 5. Save to output file & Copy to clipboard
  const outputPath = path.join(process.cwd(), 'art-director-prompt.md');
  fs.writeFileSync(outputPath, finalPrompt, 'utf8');
  
  try {
    clipboard.writeSync(finalPrompt);
  } catch (err) {
    // Graceful fallback if clipboard fails in weird terminal environments
  }

  s.stop('Prompt assembled successfully!');

  outro(pc.green(`✅ Success! Your massive context prompt is ready.`));
  console.log(pc.bgCyan(pc.black(' 📋 COPIED TO CLIPBOARD ')) + pc.cyan(` You can paste it directly into Claude or Cursor!`));
  console.log(pc.dim(`   (A backup file was also saved at: ${outputPath})\n`));
}

main().catch(console.error);
