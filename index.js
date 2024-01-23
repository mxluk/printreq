//express server that returns the entire req object

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const circularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };
    res.send(JSON.parse(JSON.stringify(req, circularReplacer(), 2)))
});

app.listen(3000, () => console.log('Server ready'));