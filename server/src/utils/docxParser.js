import mommoth from 'mammoth'

export const docxParser = async(filePath)=>{
    try {
        const result = await mommoth.extractRawText({path: filePath})
        return result.value;
    } catch (error) {
        console.log("Error parsing DOC/DOCX", error)
    }
}
