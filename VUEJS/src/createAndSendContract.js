// createAndSendContract.js
import { createContract } from './contractService.js';

export async function createAndSendContract(files) {
  const token = process.env.VITE_API_TOKEN;
  const cdi = process.env.VITE_CDI;
  const contractorId = process.env.VITE_CONTRACTOR_ID;
  const actorId = process.env.VITE_ACTOR_ID;

  try {
    // Assuming that 'files' is an array of files
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`pdfparts[${index}]`, file);
    });

    const response = await createContract(token, cdi, contractorId, actorId, formData);
    console.log('Contract created:', response);
  } catch (error) {
    console.error('Error creating contract:', error.message);
  }
}

