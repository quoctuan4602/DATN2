document
  .getElementById('filmForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);

    try {
      const response = await fetch('http://localhost:3000/films', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const result = await response.json();
      console.log('Film successfully uploaded:', result);
      alert('Film uploaded successfully!');
    } catch (error) {
      console.error('Error uploading film:', error);
      alert('Failed to upload film.');
    }
  });
