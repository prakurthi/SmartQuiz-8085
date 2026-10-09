; SmartQuiz - 8085 Quiz Buzzer demonstration for GNUSim8085
; Demonstration I/O map (use the simulator's I/O panel if available):
; Input port 00H = Team A button (00H = not pressed, 01H = pressed)
; Input port 01H = Team B button (00H = not pressed, 01H = pressed)
; Output port 02H = winner code (00H = none, 01H = Team A, 02H = Team B)
; This is a polling demo. It detects the first press observed by the CPU.
; Browser buttons are a separate UI simulation and do not directly connect
; to GNUSim8085 without an external hardware/software bridge.

ORG 2000H

START:  MVI A,00H
        OUT 02H          ; Clear winner output

WAIT:   IN 00H           ; Read Team A input
        CPI 01H
        JZ TEAM_A

        IN 01H           ; Read Team B input
        CPI 01H
        JZ TEAM_B

        JMP WAIT         ; Keep polling until a team presses

TEAM_A: MVI A,01H
        OUT 02H          ; Output 01H = Team A wins
        HLT

TEAM_B: MVI A,02H
        OUT 02H          ; Output 02H = Team B wins
        HLT
