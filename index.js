const solc = require('solc');
const path = require('path');
const Web3 = require('web3'); // new Web3(window.ethereum);
const axios = require('axios');
const cors = require('cors');

let express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);

app.use(express.json());
app.use(cors());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

let web3;


app.get('/', function (req, res) {
    console.log(req);
    res.sendFile(path.join(__dirname, '/dApp.html'));
});

app.post('/compile', function (req, res) {

    // console.dir(req.body);
    // test();

    // var output = JSON.parse(solc.compile(JSON.stringify(input)));

    // // `output` here contains the JSON output as specified in the documentation
    // for (var contractName in output.contracts['test.sol']) {
    //     console.log(
    //         contractName +
    //         ': ' +
    //         output.contracts['test.sol'][contractName].evm.bytecode.object
    //     );
    // }

    // res.send(output);
    console.log("test2");
    try {
        var output = JSON.parse(solc.compile(JSON.stringify(req.body)));
        console.log(output);

        var bytecodes = [];
        var abis = []

        for (var contractName in output.contracts['test.sol']) {
            var btcode = output.contracts['test.sol'][contractName].evm.bytecode.object
            bytecodes.push(btcode);

            var abi = output.contracts['test.sol'][contractName].abi
            abis.push(abi);

            console.log(
                `${contractName} : ${abi} ${btcode}`
            );
        }

        res.send({
            abi: abis,
            bytecode: btcode,
            res: output.contracts['test.sol']['Hello']
        });

    } catch (err) {
        console.log(err);
    }


});

server.listen(3000, function () {
    console.log('Express server listening on port ' + server.address().port);
});


function test() {

    var input = {
        language: 'Solidity',
        sources: {
            'test.sol': {
                content: 'contract C { function f() public { } }'
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    var output = JSON.parse(solc.compile(JSON.stringify(input)));

    // `output` here contains the JSON output as specified in the documentation
    for (var contractName in output.contracts['test.sol']) {
        console.log(
            contractName +
            ': ' +
            output.contracts['test.sol'][contractName].evm.bytecode.object
        );
    }
}