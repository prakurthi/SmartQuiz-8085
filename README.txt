SMARTQUIZ - 8085 QUIZ BUZZER MINI PROJECT

FILES
1. index.html       - Website layout
2. style.css        - Website styling
3. script.js        - Working two-team quiz buzzer simulation
4. quiz_buzzer.asm  - 8085 assembly polling demonstration for GNUSim8085

RUN THE WEBSITE
1. Extract this ZIP folder.
2. Open the SmartQuiz_8085 folder.
3. Double-click index.html to open it in a browser.
4. Click Start Round.
5. Press Team A or Team B BUZZ.
6. The first click locks both buzzers. Select an answer; correct answers give 10 points.
7. Reset Round starts the current question again. Next Question moves forward.

RUN THE ASSEMBLY PROGRAM
1. Open GNUSim8085.
2. Create a new assembly program and paste quiz_buzzer.asm, or open the file if your version supports opening source files.
3. Assemble/compile the program.
4. Run/execute it.
5. If your GNUSim8085 version has an I/O port panel, set input port 00H to 01H to simulate Team A, or input port 01H to 01H to simulate Team B. Check output port 02H: 01H indicates Team A; 02H indicates Team B.
6. If your version does not expose simulated I/O ports, use the web UI to demonstrate interactive buzzer behavior and present the assembly code as the microprocessor logic component.

IMPORTANT PROJECT NOTE
The browser UI and GNUSim8085 program are two separate demonstrations. The web page does not automatically read/write GNUSim8085 ports. A direct connection would require external hardware or a custom bridge. The assembly program uses polling; if both input ports are pressed before the CPU reads them, Team A is checked first and may be selected.
