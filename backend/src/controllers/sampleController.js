class SampleController {
    getSample(req, res) {
        res.send('Sample GET request response');
    }

    postSample(req, res) {
        const sampleData = req.body;
        res.send(`Sample POST request received with data: ${JSON.stringify(sampleData)}`);
    }
}

module.exports = SampleController;