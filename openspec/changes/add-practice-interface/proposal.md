# Change: Add Initial Practice Interface

## Why
Users need a basic interface to practice Chinese input methods (Cangjie). The interface should display a target character, allow users to type their answer, and provide immediate feedback on correctness.

## What Changes
- Add initial practice interface with three textareas:
  - T1: Displays target character for practice
  - T2: User input field for typing Cangjie spelling
  - T3: Shows correct answer when user input is incorrect
- Implement word bank loading from `/data/Cangjie5_TC.txt`
- Add answer validation logic
- Add visual feedback (blue for correct, red for incorrect)
- Auto-focus on T2 after word selection
- Clear functionality for T2 and T3

## Impact
- Affected specs: New capability `practice-interface`
- Affected code: New React components, data loading utilities

