## ADDED Requirements

### Requirement: Practice Interface Display
The system SHALL display a practice interface with three textareas:
- T1: Target character display (read-only)
- T2: User input field for Cangjie spelling
- T3: Correct answer display (read-only, shown on incorrect answer)

#### Scenario: Display practice interface
- **WHEN** the application loads
- **THEN** all three textareas are visible and T1, T2, T3 are empty
- **AND** T2 and T3 are cleared

### Requirement: Word Bank Selection
The system SHALL load word-spelling pairs from Cangjie5_TC.txt and allow selection of a word for practice.

#### Scenario: Select word from bank
- **WHEN** a word is selected from the word bank
- **THEN** the target character is displayed in T1
- **AND** T2 and T3 are cleared
- **AND** T2 receives focus automatically

### Requirement: Answer Validation
The system SHALL validate user input against the correct Cangjie spelling when Enter is pressed.

#### Scenario: Correct answer submission
- **WHEN** user types the correct spelling in T2 and presses Enter
- **THEN** T2 background color changes to blue
- **AND** T3 remains empty

#### Scenario: Incorrect answer submission
- **WHEN** user types an incorrect spelling in T2 and presses Enter
- **THEN** T2 background color changes to red
- **AND** the correct spelling is displayed in T3

### Requirement: Clear Functionality
The system SHALL provide functionality to clear T2 and T3 textareas.

#### Scenario: Clear input fields
- **WHEN** clear action is triggered
- **THEN** T2 content is cleared
- **AND** T3 content is cleared
- **AND** T2 background color is reset to default

