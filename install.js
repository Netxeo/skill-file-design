#!/usr/bin/env node

import { intro, outro, select, text, spinner, isCancel, cancel } from '@clack/prompts';
import pc from 'picocolors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const iconCorrelations = {
  '31-core-aesthetics.md': 'Lucide Icons (Clean, neutral, modern)',
  '22-maximalism-and-brutalism.md': 'Phosphor Icons (Bold or Fill weight for heavy impact)',
  '21-retro-and-nostalgia.md': 'Pixelarticons or Phosphor Icons (Duotone weight)',
  '23-cinematic-and-photography.md': 'Radix Icons (Ultra-minimalist, thin)',
  '26-3d-and-motion-design.md': 'Lucide Icons (Lightweight to not distract from 3D)',
  '35-experimental-and-anti-ux.md': 'Remix Icon (Solid/Abstract)',
  '30-classical-fine-art.md': 'Radix Icons (Elegant, unobtrusive)',
  '29-analog-and-vintage-tech.md': 'Phosphor Icons (Regular weight, technical feel)',
  '38-typography-and-layout-art.md': 'Phosphor Icons (Light weight, typographic harmony)',
  '25-illustration-and-2d-art.md': 'Heroicons (Outline)',
  'custom': 'Lucide Icons (Versatile)'
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
    cancel('Installation cancelled.');
    process.exit(0);
  }
}

// Ensure .skills/design exists
function ensureSkillDir(targetDir) {
  const dirPath = path.join(targetDir, '.skills', 'design');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}

// Scan for existing rules or skills to ensure non-destructive harmony
function detectExistingRules(targetDir) {
  let hasExistingRules = false;
  
  const files = ['CLAUDE.md', '.cursorrules', '.clinerules', '.windsurfrules', 'AGENTS.md'];
  for (const file of files) {
    const filePath = path.join(targetDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const stats = fs.statSync(filePath);
        if (stats.size > 200) { // Indicates substantial existing custom instructions
          hasExistingRules = true;
          break;
        }
      } catch(e) {}
    }
  }

  const skillsDir = path.join(targetDir, '.skills');
  if (fs.existsSync(skillsDir)) {
    try {
      const subdirs = fs.readdirSync(skillsDir).filter(d => d !== 'design'); // Ignore our own folder
      if (subdirs.length > 0) {
        hasExistingRules = true;
      }
    } catch(e) {}
  }
  
  return hasExistingRules;
}

// Inject AI configs
function injectAIConfigs(targetDir) {
  const skillPath = '.skills/design/skill.md';
  const instructionBlock = `\n\n## 🎨 Art Director Skill\nWhen generating frontend code, components, or UI designs, you MUST act as the Autonomous Art Director.\nRead and strictly follow the design system instructions found in: \`${skillPath}\`\n`;

  const files = [
    { file: 'CLAUDE.md', flag: '--claude' },
    { file: '.cursorrules', flag: '--cursor' },
    { file: '.clinerules', flag: '--cline' },
    { file: '.windsurfrules', flag: '--windsurf' },
    { file: 'AGENTS.md', flag: '--agents' }
  ];

  let injected = [];
  
  files.forEach(({ file }) => {
    const filePath = path.join(targetDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (!content.includes('Art Director Skill')) {
        fs.appendFileSync(filePath, instructionBlock);
        injected.push(file);
      }
    } else {
      fs.writeFileSync(filePath, `# ${file} AI Configuration${instructionBlock}`);
      injected.push(file);
    }
  });
  
  return injected;
}

async function main() {
  const args = process.argv.slice(2);
  const targetDir = process.cwd();
  
  console.clear();
  intro(pc.bgMagenta(pc.white(' 🎨 Autonomous Art Director Installer ')));

  // If silent mode via args
  let industry = '01-digital-saas-ui.md';
  let customIndustryText = '';
  let mood = '31-core-aesthetics.md';
  let customMoodText = '';
  let subculture = 'none';
  let customSubcultureText = '';
  let ambition = 'premium';
  let framework = 'React / Next.js';
  let styling = 'Tailwind CSS';
  let animation = 'GSAP';

  if (!args.includes('--yes') && !args.includes('--all')) {
    industry = await select({
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

    if (industry === 'other') {
      customIndustryText = await text({ message: 'Describe your industry:' });
      checkCancel(customIndustryText);
      const match = findBestMatch(customIndustryText);
      if (match) { industry = match; } else { industry = 'custom'; }
    }

    mood = await select({
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

    if (mood === 'other') {
      customMoodText = await text({ message: 'Describe the mood:' });
      checkCancel(customMoodText);
      const match = findBestMatch(customMoodText);
      if (match) { mood = match; } else { mood = 'custom'; }
    } else if (mood === 'auto') {
      const recs = industryCorrelations[industry]?.moods || industryCorrelations['custom'].moods;
      mood = await select({
        message: 'Here are the best matching aesthetics:',
        options: [...recs.map(m => ({ value: m, label: labelsMap[m] || m })), { value: 'surprise', label: 'Surprise me!' }]
      });
      checkCancel(mood);
      if (mood === 'surprise') mood = recs[Math.floor(Math.random() * recs.length)];
    } else if (mood === 'friction') {
      const recs = industryCorrelations[industry]?.moods || industryCorrelations['custom'].moods;
      const frictionMoods = allMoods.filter(m => !recs.includes(m));
      mood = frictionMoods[Math.floor(Math.random() * frictionMoods.length)];
    }

    subculture = await select({
      message: 'Any specific target audience or subculture to blend in?',
      options: [
        { value: 'auto', label: '✨ Recommend for me' },
        { value: 'friction', label: '🎲 Force deliberate contrast' },
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

    if (subculture === 'other') {
      customSubcultureText = await text({ message: 'Describe the subculture:' });
      checkCancel(customSubcultureText);
      const match = findBestMatch(customSubcultureText);
      if (match) { subculture = match; } else { subculture = 'custom'; }
    } else if (subculture === 'auto') {
      const indSubs = industryCorrelations[industry]?.subcultures || industryCorrelations['custom'].subcultures;
      const moodSubs = moodCorrelations[mood] || moodCorrelations['custom'];
      let recs = indSubs.filter(s => moodSubs.includes(s));
      if (recs.length === 0) recs = [...new Set([...indSubs, ...moodSubs])];
      if (recs.length === 1 && recs[0] === 'none') {
        subculture = 'none';
      } else {
        subculture = await select({
          message: 'Best matching subcultures:',
          options: [...recs.map(s => ({ value: s, label: labelsMap[s] || s })), { value: 'surprise', label: 'Surprise me!' }]
        });
        checkCancel(subculture);
        if (subculture === 'surprise') subculture = recs[Math.floor(Math.random() * recs.length)];
      }
    } else if (subculture === 'friction') {
      const indSubs = industryCorrelations[industry]?.subcultures || industryCorrelations['custom'].subcultures;
      const frictionSubs = allSubcultures.filter(s => !indSubs.includes(s) && s !== 'none');
      subculture = frictionSubs[Math.floor(Math.random() * frictionSubs.length)] || '36-japanese-pop-culture.md';
    }

    ambition = await select({
      message: 'What is the ambition level / polish requirement?',
      options: [
        { value: 'mvp', label: 'MVP (Clean, Fast, Accessible UI)' },
        { value: 'premium', label: 'Premium (Micro-interactions, high polish)' },
        { value: 'awwwards', label: 'Awwwards Level (Creative layouts, complex)' }
      ]
    });
    checkCancel(ambition);

    framework = await select({
      message: 'Frontend Framework?',
      options: [
        { value: 'React / Next.js', label: 'React / Next.js' },
        { value: 'Vue / Nuxt', label: 'Vue / Nuxt' },
        { value: 'Svelte / SvelteKit', label: 'Svelte / SvelteKit' },
        { value: 'Vanilla HTML/JS', label: 'Vanilla HTML/JS' },
        { value: 'other', label: 'Other' }
      ]
    });
    checkCancel(framework);

    styling = await select({
      message: 'Styling approach?',
      options: [
        { value: 'Tailwind CSS', label: 'Tailwind CSS' },
        { value: 'Vanilla CSS / SCSS', label: 'Vanilla CSS / SCSS' },
        { value: 'CSS Modules', label: 'CSS Modules' },
        { value: 'other', label: 'Other' }
      ]
    });
    checkCancel(styling);

    animation = await select({
      message: 'Animation library?',
      options: [
        { value: 'GSAP', label: 'GSAP (Recommended)' },
        { value: 'Framer Motion', label: 'Framer Motion' },
        { value: 'CSS Only', label: 'CSS Only' },
        { value: 'Three.js / WebGL', label: 'Three.js / WebGL' },
        { value: 'none', label: 'None' }
      ]
    });
    checkCancel(animation);
  }

  const s = spinner();
  s.start('Installing Art Director Skill into your project...');

  const skillDir = ensureSkillDir(targetDir);

  const coreAntiAi = readFile('content/core/00-anti-ai-design.md');
  const coreUiLaws = readFile('content/core/01-ui-laws-and-systems.md');
  const coreUxHuman = readFile('content/core/02-ux-human-psychology.md');
  const coreCreativeTech = readFile('content/core/03-creative-technologies.md');

  const industryContent = industry === 'custom' ? `USER CUSTOM INDUSTRY DIRECTIVE:\nTarget: "${customIndustryText}".` : readFile(`content/design-trends/${industry}`);
  const moodContent = mood === 'custom' ? `USER CUSTOM MOOD DIRECTIVE:\nAesthetic: "${customMoodText}".` : readFile(`content/design-trends/${mood}`);
  let subcultureContent = '';
  if (subculture === 'custom') subcultureContent = `USER CUSTOM SUBCULTURE DIRECTIVE:\nAudience: "${customSubcultureText}".`;
  else if (subculture !== 'none') subcultureContent = readFile(`content/design-trends/${subculture}`);

  let ambitionText = ambition === 'awwwards' ? 'AWWWARDS LEVEL: Push boundaries. Asymmetrical/complex grids, aggressive animations. Break standard UX rules if it enhances creative impact.' :
                     ambition === 'premium'  ? 'PREMIUM LEVEL: Focus on polished micro-interactions, typography scaling, subtle gradients, high-end feel.' :
                                               'MVP LEVEL: Standard layout, fast to build, but apply aesthetic perfectly through typography/colors.';

  const hasExistingRules = detectExistingRules(targetDir);
  if (hasExistingRules) {
    console.log(pc.yellow('   => Detected existing rules/skills in your project. Activating Harmony Mode.'));
  }

  const harmonyClause = hasExistingRules ? `
---
## 🚨 SKILL HARMONY & EXISTING USER CONSTRAINTS
I have detected that the user already has existing design rules, custom instructions, or other community skills installed in this project.
**CRITICAL MANDATE:** You must FUSE my Autonomous Art Director constraints seamlessly WITH their existing rules. 
Do NOT conflict with or overwrite their pre-existing design decisions. Harmonize my "Anti-AI" principles with their existing stack and preferences to create the ultimate result.
` : '';

  const iconLibrary = iconCorrelations[mood] || iconCorrelations['custom'];

  const finalPrompt = `
# SYSTEM ROLE: AUTONOMOUS ART DIRECTOR & SENIOR FRONTEND DEV

Your primary objective is to **GENERATE SPECTACULAR, PRODUCTION-READY DESIGN AND CODE**. You are not just a passive consultant; you are the creator. You must build sites, apps, and assets that strictly DO NOT look like they were generated by AI. 

To achieve this, rigorously apply the variables and constraints chosen below.

---
## 1. TECH STACK CONSTRAINTS
- **Framework:** ${framework}
- **Styling:** ${styling}
- **Animation:** ${animation}
- **Icons:** ${iconLibrary}
CRITICAL: Write the actual code using this exact stack. Do not hallucinate or use libraries not listed here.

---
## 2. AMBITION & COMPLEXITY
- **Target Polish Level:** ${ambition.toUpperCase()}
- **Directive:** ${ambitionText}

---
## 3. CORE DESIGN CONSTRAINTS (MANDATORY)
You MUST respect these 4 core pillars to eradicate the "AI Look".

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
${harmonyClause}
---
# 🛑 ANTI-RUSHING & STRICT STEP-BY-STEP WORKFLOW
AI models naturally try to finish tasks in a single response to "save time" by inventing CSS gradients or abstract blurry shapes instead of asking for real assets. **THIS IS STRICTLY FORBIDDEN.**

1. **NEVER RUSH:** Do not attempt to deliver the entire fully-coded page in one shot if it requires visual assets. 
2. **NO FAKE ASSETS:** Do not use blurry CSS circles, random geometric shapes, or colored squares to "simulate" an image. This instantly creates the cheap "AI Look".
3. **MANDATORY PAUSE:** You MUST stop writing code the moment an image, 3D render, or specific texture is needed. Give the user the Midjourney prompt, and literally stop your response. 
4. **ETAPE PAR ETAPE:** Design is a collaborative process. We build it step-by-step. Wait for the user to provide the generated asset before writing the code that uses it.
  `.trim();

  fs.writeFileSync(path.join(skillDir, 'skill.md'), finalPrompt, 'utf8');
  const injectedFiles = injectAIConfigs(targetDir);

  s.stop('Skill successfully installed!');

  outro(pc.green(`✅ Art Director Skill is now embedded in your project!`));
  console.log(pc.cyan(`   📁 Created: .skills/design/skill.md`));
  injectedFiles.forEach(f => console.log(pc.cyan(`   🔌 Injected: ${f}`)));
  console.log(pc.dim('\nYour AI coding assistant now operates as an Elite Art Director.'));
}

main().catch(console.error);
