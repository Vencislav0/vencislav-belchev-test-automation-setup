


var twoSum = function(nums, target) {   
    let rightIndex = 1
    let leftIndex = 0 

    while(leftIndex < nums.length - 1){
        if(nums[leftIndex] + nums[rightIndex] === target){
            return [leftIndex, rightIndex]
        }
        rightIndex++

        if(rightIndex >= nums.length){
            leftIndex++
            rightIndex = leftIndex + 1
        }
    }
    
      
};

console.log(twoSum([3, 3], 6))