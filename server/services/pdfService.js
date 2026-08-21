import pdf from "pdf-parse";

const extractText = async (buffer) => {
  const data = await pdf(buffer);
  return data.text;
};

export default extractText;