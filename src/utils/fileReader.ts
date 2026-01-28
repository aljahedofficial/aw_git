import * as pdfjsLib from 'pdfjs-dist'

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

export async function readFile(file: File): Promise<string> {
  const filename = file.name.toLowerCase()

  if (filename.endsWith('.pdf')) {
    return await readPDF(file)
  } else if (filename.endsWith('.docx')) {
    return await readDOCX(file)
  } else {
    return await readText(file)
  }
}

async function readText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      resolve(content || '')
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}

async function readPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let text = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => item.str || '')
        .join(' ')
      text += pageText + '\n'
    }

    return text || '[PDF extraction produced no readable text]'
  } catch (error) {
    console.error('PDF reading error:', error)
    return `[Could not extract PDF text: ${error instanceof Error ? error.message : 'Unknown error'}]`
  }
}

async function readDOCX(_file: File): Promise<string> {
  // DOCX files are ZIP archives, would need jszip library
  // For now, return a message
  return '[DOCX preview coming soon - please use .txt or .pdf files for now]'
}
