// namespace, protect variables, function from colliding with those in other modules
(function () {
    var a = 2;
    var b = 4;
    var c = Math.pow(a, b);
    //        alert(c);
    var fact = 1;
    for (var i = 1; i <=5; i ++)
    {
        fact = fact * i;
    }

    var arr = [12,78,4,23,56,67,54,32,34];
    var min = arr[0];
    var max = arr[0];
    for(var j=0; j<arr.length; j++)
    {
        if (arr[j] > max)
            max = arr[j];
        if (arr[j] < min)
            min = arr[j];
    }
    alert("Min: " + min);
    alert("Max: " + max);
    var min2 = minFunct(arr);
    alert("Min2: " + min2);

    function minFunct(arr) {
        var min = arr[0];
        for(var j=0; j<arr.length; j++)
            if (arr[j] < min)
                min = arr[j];
        return min
    }
})();