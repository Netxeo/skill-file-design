# 🧠 Project Memory: Autonomous Art Director CLI

## 🎯 Current Status (Completed)
- **Taxonomy Migration**: 100% Complete.
- We successfully digested the master catalog of 400+ design trends and distributed them across **43 highly detailed Markdown modules** located in `content/design-trends/`.
- Every trend follows an strict 8-point architectural standard: Psychological Intent, Colors, Typography, Spacing, Negative Space, Assets, Animations, and Tech Stack (CSS/WebGL/GSAP constraints).
- The original `design-trends-catalog.md` has been successfully deleted by the user, as the architecture is now the single source of truth.

## 🚀 Next Session Objective: The Engine (`bin.js`)
The goal for tomorrow is to shift from **Knowledge Base (Passive)** to **Engine (Active)** by building `bin.js`.

### Technical Plan for `bin.js`:
1. **Interactive CLI**: Use `commander` and `inquirer` (or `@clack/prompts` for a premium feel) to build a beautiful terminal interface.
2. **The "Art Director" Interview Flow**: The CLI will ask the user for:
   - The **Industry** (e.g., FinTech, E-commerce, Healthcare).
   - The **Mood/Emotion** (e.g., Aggressive, Minimalist, Nostalgic).
   - The **Target Audience / Subculture** (e.g., Gen-Z, Corporate, High-Fashion).
3. **Semantic Retrieval**: Based on the answers, the script will automatically pick the 3 or 4 relevant `.md` files out of the 43 we created.
4. **Prompt Assembly**: It will merge these files into a massive, context-heavy "System Prompt".
5. **Anti-AI Protocol**: It will automatically append the rules from `00-anti-ai-design.md` to ensure the generated code uses complex CSS/GSAP instead of basic Tailwind presets.

---
*Ready to code the brain tomorrow.*
