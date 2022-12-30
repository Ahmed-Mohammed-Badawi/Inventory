export default function makeA_token(){
    const tokenArray = [`a1h1m5e8d3`];
    // Make A string from 150 number;
    for(let i = 0; i < 150; i++)
    {
        // get A random Number
        let random = (Math.random() + 1).toString(36).substring(7);
        tokenArray.push(random);
    }

    // Add a special number in the end of the token
    tokenArray.push(`a5h0m1e6d0`);
    // convert the Array to String
    const token = tokenArray.join('').toString();
    // return
    return token;
}