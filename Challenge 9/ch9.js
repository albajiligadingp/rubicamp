function spiral(param1) {
    let index = 0;
    let template = [];
    // template spiral (array 2 dimensi)
    for (let i = 0; i < param1; i++) {
        template[i] = []; // [[]]
        for (let j = 0; j < param1; j++) {
            template[i][j] = index; // [[0,1,2,3,4]]
            index++
        }
    }
    // looping spiral
    let top = 0;
    let bottom = param1 - 1;
    let left = 0;
    let right = param1 - 1;
    let nums = param1 * param1;
    let result = [];
    while (result.length < nums) {
        // kanan
        for (let o = left; o <= right; o++) { 
            result.push(template[top][o]); // push template[0][0-4] ke result
        }
        top++;
        // bawah
        for (let o = top; o <= bottom; o++) {
            result.push(template[o][right]); // push template[1-4][4] ke result
        }
        right--;
        // kiri
        for (let o = right; o >= left; o--) {
            result.push(template[bottom][o]); // push template[4][3-0] ke result
        }
        bottom--;
        // atas
        for (let o = bottom; o >= top; o--) {
            result.push(template[o][left]); // push template[3-1][0] ke result
        }
        left++;
    }
    console.log(result);
}

spiral(5);
spiral(6);
spiral(7);