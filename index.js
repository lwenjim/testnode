#!/usr/bin/env node

function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let isOk = true;
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
                isOk = false;
            }
        }
        if (isOk) {
            break;
        }
    }
    return arr;
}

function selectionSort(arr) {
    let minIndex, temp;
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}

//递归
function quickSort1(arr) {
    if (arr.length <= 1) return arr;
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [], right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort1(left).concat([pivot], quickSort1(right));
}

//非递归
function quickSort(arr) {
    var left = 0, right = arr.length - 1;
    var list = [[left, right]];
    while (list.length > 0) {
        var num = list.pop();
        if (num[0] >= num[1]) {
            continue;
        }
        var i = num[0], j = num[1], flag = num[0];
        while (i < j) {
            while (arr[flag] <= arr[j] && flag < j) j--;
            if (i >= j) break;
            while (arr[i] <= arr[flag] && i < j) i++;
            var temp = arr[flag];
            arr[flag] = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
            flag = i;
        }
        list.push([num[0], flag - 1]);
        list.push([flag + 1, num[1]]);
    }
}

function buildMaxHeap(arr) {
    let mid = Math.floor(arr.length / 2);
    for (let i = mid; i <= 0; i--) {
        heapify(arr, i);
    }
}

function heapify(arr, i) {
    let left = 2 * i + 1,
        right = 2 * i + 2,
        par = i,
        len = arr.length;
    if (left < len && arr[left] > arr[par]) {
        par = left;
    }
    if (right < len && arr[right] > arr[par]) {
        par = right;
    }
    if (i != par) {
        swap(arr, i, par);
        heapify(arr, par);
    }
}

function swap(arr, i, par) {
    let temp = arr[i];
    arr[i] = arr[par];
    arr[par] = temp;
}

function merge(left, right) {
    let result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left).concat(right);
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let leftArr = arr.slice(0, mid), rightArr = arr.slice(mid);
    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

var generateParenthesis = function (n) {
    const res = [];
    const backTracing = (lRemain, rRemain, str) => { // 左右括号所剩的数量，str是当前构建的字符串
        if (str.length == 2 * n) { // 字符串构建完成
            res.push(str);           // 加入解集
            return;                  // 结束当前递归分支
        }
        if (lRemain > 0) {         // 只要左括号有剩，就可以选它，然后继续做选择（递归）
            backTracing(lRemain - 1, rRemain, str + "(");
        }
        if (lRemain < rRemain) {   // 右括号比左括号剩的多，才能选右括号
            backTracing(lRemain, rRemain - 1, str + ")"); // 然后继续做选择（递归）
        }
    };
    backTracing(n, n, ""); // 递归的入口，剩余数量都是n，初始字符串是空串
    return res;
}
var permute = function (nums) {
    if (!nums.length) return
    let res = []
    let backTrack = path => {
        //长度满足条件，加入结果
        if (path.length === nums.length) {
            res.push(path)
            return
        }
        nums.forEach(item => {
            if (path.includes(item)) return //不包含重复的数字
            backTrack([...path, item]) //加入路径，继续递归选择
        });
    }
    backTrack([])
    return res
}

var totalNQueens = function (n) {
    let count = 0; //皇后可放置的总数
    let isValid = (row, col, board, n) => {
        //所在行不用判断，每次都会下移一行
        //判断同一列的数据是否包含
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') {
                return false
            }
        }
        //判断45度对角线是否包含
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') {
                return false
            }
        }
        //判断135度对角线是否包含
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; j--, i--) {
            if (board[i][j] === 'Q') {
                return false
            }
        }
        return true
    }

    let backTracing = (row, board) => {
        //走到最后一行，统计次数
        if (row === n) {
            count++;
            return
        }

        for (let x = 0; x < n; x++) {
            //判断该位置是否可以放置 皇后
            if (isValid(row, x, board, n)) {
                board[row][x] = 'Q'; //放置皇后
                backTracing(row + 1, board); //递归
                board[row][x] = '.'; //回溯，撤销处理结果
            }
        }
    }
    let board = [...Array(n)].map(v => v = ([...Array(n)]).fill('.')) //棋盘
    console.log(board)
    backTracing(0, board)
    return count
};

const subsets = (nums) => {
    const res = [];
    const backTracing = (index, list) => {
        res.push(list.slice());                     // 调用子递归前，加入解集
        for (let i = index; i < nums.length; i++) { // 枚举出所有可选的数
            list.push(nums[i]);                     // 选这个数
            backTracing(i + 1, list);               // 基于选这个数，继续递归
            list.pop();                             // 撤销选这个数
        }
    };
    backTracing(0, []);
    return res;
};

var combine = function (n, k) {
    let result = [];
    let backTracing = (start, path) => {
        // 如果已经选满了的话，加入结果集中
        if (path.length == k) {
            result.push(path.slice());
            return;
        }
        // 从开始的数字到末尾的数字
        for (let i = start; i <= n; i++) {
            // 加入选择列表中
            path.push(i);
            // 继续深度搜索
            backTracing(i + 1, path);
            // 撤销选择
            path.pop(i);
        }
    };
    backTracing(1, []);
    return result;
};

res = combine(12, 10)
console.log(res);