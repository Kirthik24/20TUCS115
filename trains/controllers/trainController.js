const axios = require('axios');

async function getBearerToken() {
    try {
      const requestData = {
        "companyName": "KR TECH",
        "clientID": "c4240a9c-c7e9-4889-9fbc-7760e283fffe",
        "clientSecret": "uquJWJaJEqFPCDpC",
        "ownerName": "Kirthik",
        "ownerEmail": "20tucs115@skct.edu.in",
         "rollNo": "20TUCS115"
      };
      const response = await axios.post('http://20.244.56.144/train/auth', requestData);
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching the Bearer token:', error.message);
      return null;
    }
}

const handleGetTrains = async(req, res)=>{
    try {
        const bearerToken = await getBearerToken();

    if (!bearerToken) {
        return res.status(500).json({ error: 'Failed to retrieve the Bearer token' });
    }

    const configuration = {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
    };
    const apiResponse = await axios.get('http://20.244.56.144/train/trains', configuration);

    const currentTime = new Date();

    
    const filteredTrains0 = apiResponse.data.filter(item => !(parseInt(item.departureTime.Hours) === 0 &&  parseInt(item.departureTime.Minutes) < 30));
    const filteredTrains =  filteredTrains0.filter(item => parseInt(item.departureTime.Hours) < 12);

    filteredTrains.sort((a, b) => {
      if (a.price.sleeper === b.price.sleeper) {
        const aDepartureTime = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          a.departureTime.Hours,
          a.departureTime.Minutes,
          a.departureTime.Seconds
        );
        const bDepartureTime = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          b.departureTime.Hours,
          b.departureTime.Minutes,
          b.departureTime.Seconds
        );

        return bDepartureTime - aDepartureTime;
      } else {
        return a.price.sleeper - b.price.sleeper;
      }
    });
        res.json(filteredTrains);
    } catch (error) {
        res.status(500).json({ error: 'Error While calling the data' });
    }
      
}

module.exports = {handleGetTrains}