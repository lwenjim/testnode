#!/usr/bin/env node

function bubbleSort(arr) {
    //数组的长度
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        //相邻的数进行比较
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
        //最小的数的下标
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
        //当前值的插入位置
        arr[preIndex + 1] = current;
    }
    return arr;
}

//递归
function quickSort1(arr) {
    if (arr.length <= 1) return arr;
    //向下取值取中间值下标
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
    //左右两边加中间数合并数组
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

//建一个大顶堆
function buildMaxHeap(arr) {
    let mid = Math.floor(arr.length / 2);
    for (let i = mid; i <= 0; i--) {
        heapify(arr, i);
    }
}

//调整堆
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

//交换两个数
function swap(arr, i, par) {
    let temp = arr[i];
    arr [i] = arr[par];
    arr[par] = temp;
}

//分组排序
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
    //分组
    let leftArr = arr.slice(0, mid), rightArr = arr.slice(mid);
    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

let arr = [9, 3, 5, 10, -3];
console.log(mergeSort(arr));
