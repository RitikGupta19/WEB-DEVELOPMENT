import React, { useState, useEffect } from 'react';

const Input = () => {

    const [flag, setFlag] = useState([0]);
    const [range, setRange] = useState(0)
    const [number, setNumber] = useState();
    const [random, setRandom] = useState(0);
    const [diff, setDiff] = useState(0);
    const [success, setSuccess] = useState(false);

    const changeHandler = (event) => {
        setNumber(event.target.value);
    };

    const calculateAns = (event) => {
        event.preventDefault();
        setSuccess(false);

        const difference = Math.abs(random - number);
        setDiff(difference);
        if (difference === 0) {
            const f = flag;
            f.push(f + 1);
            setFlag(f);
        }
        setSuccess(true);
    };

    const ansMessage = () => {
        if (diff === 0 && number !== 0 ) {
            return (<div className="alert alert-success">Correct</div>)
        }
        else if (diff >= 1 && diff <= 4) {
            return (<div className="alert alert-danger">Hot</div>)
        }
        else if (diff >= 5 && diff <= 15) {
            return (<div className="alert alert-warning">Warm</div>)
        }
        else if (number !== 0) {
            return (<div className="alert alert-primary">Cold</div>)
        }
    };

    const createRange = () => {
        var Range = range + 100;
        setRange(Range);
    };

    const createRandomNumber = () => {
        if (range === 0)
            var randomNumber = Math.floor((Math.random() * 100) + 1);
        else
            var randomNumber = Math.floor((Math.random() * range) + 1);
        setRandom(randomNumber);
    };

    useEffect(() => {
        createRange();
        createRandomNumber();
    }, [flag.length]);

    return (
        <div>
        {flag.map((f, index) => {
            return (
                <div>
                <form key={index} className="mt-5">
                <div className="form-group">
                  <input 
                    type="number" 
                    className="form-control" 
                    id="exampleInputEmail1"
                    onChange={changeHandler}
                    
                    autoFocus 
                    />
                </div>
                    <button 
                    className="btn btn-primary mb-3"
                    onClick={calculateAns}>Submit</button>
              </form>
                </div>
            )
        })}
        <label>Enter Number in Range : (1 - {range})</label>
        {success && ansMessage()}
        </div>
    );
};

export default Input;
