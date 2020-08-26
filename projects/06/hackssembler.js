const fs = require('fs');


const sanitizeLine = (line) => {
  const trimmedLine = line.trim()
  const sanitizedLine = trimmedLine
                          .split(/\s+/)
                          .join()

  return sanitizedLine
}

const aInstructionToBinary = (line) => {
  const decimalString = line.slice(1)
  const binaryNumber = (decimalString >>> 0)
                          .toString(2)
                          .padStart(15, "0")

  return "0" + binaryNumber
}

const compToBinary = {
  "0":   "0101010",
  "1":   "0111111",
  "-1":  "0111010",
  "D":   "0001100",
  "A":   "0110000",
  "!D":  "0001101",
  "!A":  "0110001",
  "-D":  "0001111",
  "-A":  "0110011",
  "D+1": "0011111",
  "A+1": "0110111",
  "D-1": "0001110",
  "A-1": "0110010",
  "D+A": "0000010",
  "D-A": "0010011",
  "A-D": "0000111",
  "D&A": "0000000",
  "D|A": "0010101",

  "M":   "1110000",
  "!M":  "1110001",
  "-M":  "1110011",
  "M+1": "1110111",
  "M-1": "1110010",
  "D+M": "1000010",
  "D-M": "1010011",
  "M-D": "1000111",
  "D&M": "1000000",
  "D|M": "1010101",
}

const destToBinary = {
  "":    "000",
  "M":   "001",
  "D":   "010",
  "MD":  "011",
  "A":   "100",
  "AM":  "101",
  "AD":  "110",
  "AMD": "111",
}

const jumpToBinary = {
  "":    "000",
  "JGT": "001",
  "JEQ": "010",
  "JGE": "011",
  "JLT": "100",
  "JNE": "101",
  "JLE": "110",
  "JMP": "111",
}

const destCinstructionToBinary = (line) => {
  const [dest, comp] = line.split("=")

  return "111"
          + compToBinary[comp]
          + destToBinary[dest]
          + jumpToBinary[""]
}

const jumpCinstructionToBinary = (line) => {
  const [comp, jump] = line.split(";")

  return "111"
          + compToBinary[comp]
          + destToBinary[""]
          + jumpToBinary[jump]
}

const parseLine = rawLine => {
  const line = sanitizeLine(rawLine)

  if (/^\/\//.test(line)) {
    return ""
  } else if (/@\d+/.test(line)) {
    return aInstructionToBinary(line)
  } else if (/=/.test(line)) {
    return destCinstructionToBinary(line)
  } else if (/;/.test(line)) {
    return jumpCinstructionToBinary(line)
  } else {
    return ""
  }
}

const parseFile = (fileData) => {
  const lines = fileData.split("\n")
  const parsedLines = lines.map(line => parseLine(line))
  const nonEmptyLines = parsedLines.filter(line => line !== "")

  return nonEmptyLines
}

const readFile = (filePath) => {
  let fileData = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })

  return fileData
}

const writeFile = (filePath, contents) => {
  fs.writeFile(filePath, contents, (err) => {
    if (err) throw (err)
  })
}

const main = async () => {
  const [filePath] = process.argv.slice(2, 3)
  const data = await readFile(filePath)

  const parsedLines = parseFile(data)
  const parsedFile = parsedLines.join("\n") + "\n"
  const fileName = filePath
                    .slice(0, filePath.length - 3)
                    + "hack"

  writeFile(fileName, parsedFile)
}

main();
