// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed.
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

// Infinite loop checking keyboard address for any key press
  // If there is a key press
    // Loop for height of screen
      // Loop for width of screen
        // Make pixel black
  // Else
    // Loop through height and width
      // Make pixel white

(LISTEN)
  @KBD
  D=M
  @SETBLACK
  D; JGT

  @color
  M=0

  @PAINTSCREEN
  0; JMP

(SETBLACK)
  @color
  M=-1
  @PAINTSCREEN
  0; JMP

(PAINTSCREEN)
  @SCREEN
  D=A
  @address
  M=D

  @KBD
  D=A
  @SCREEN
  D=D-A
  @rows
  M=D

  @row
  M=0

  @LOOP
  0; JMP

(LOOP)
  @row
  D=M
  @rows
  D=D-M
  @LISTEN
  D; JEQ

  @color
  D=M
  @address
  A=M
  M=D

  @row
  M=M+1
  @1
  D=A
  @address
  M=D+M

  @LOOP
  0; JMP
