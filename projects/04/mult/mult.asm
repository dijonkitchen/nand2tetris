// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.

// Pseudocode:
  // Set num1 as R0
  // Set num2 as R1
  // Set product to zero
  // Set R2 as product

  // If num1 > 0:
    // LOOP while num2 > 0
      // Add num1 to product
      // Decrease num2 by 1
    // Else
      // Jump to end

  // Infinite END loop to protect from memory attacks
  // Jump back to END

@R0
D=M
@num1
M=D

@R1
D=M
@num2
M=D

@product
M=0
@SETPRODUCT
0; JMP

@num1
D=M
@CHECKNONZERO
D; JGT

@SETPRODUCT
0; JMP

@END

(SETPRODUCT)
  @product
  D=M

  @R2
  M=D

(CHECKNONZERO)
  @num2
  D=M

  @MULTIPLY
  D; JGT

  @SETPRODUCT
  0; JMP

  @END

(MULTIPLY)
  @num1
  D=M

  @product
  M=D+M

  @num2
  M=M-1

  @num2
  D=M

  @MULTIPLY
  D; JGT

  @SETPRODUCT
  0; JMP

(END)
  @END
  0;JMP
