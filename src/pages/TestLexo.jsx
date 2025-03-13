import {LexoRank} from "lexorank";

function Test() {


    let start = LexoRank.min();
    let next = start.genNext();
    // let res = [];
    for (let i = 1; i < 1000; i++) {
        // res.push(start.toString())
        // start = start.genNext();
        next = next.between(start);
    }
    
    console.log(next);
    
    // console.log(res);
    
    // max
    const maxLexoRank = LexoRank.max();
    // middle
    const middleLexoRank = LexoRank.middle();
    // parse
    const parsedLexoRank = LexoRank.parse('0|0i0000:');
  return (
    <>
      <div>{maxLexoRank.toString()} {middleLexoRank.toString()} {parsedLexoRank.toString()}</div>
    </>
  );
}

export default Test;
