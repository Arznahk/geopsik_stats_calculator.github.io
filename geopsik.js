let freshman = {
    number: [],
    check(){
        if(typeof(valueToInt('freshman')) != "number" || document.getElementById('freshman').value == ""){
            document.getElementById('freshman').value = 0
        } else if (document.getElementById('freshman').value<0){
            document.getElementById('freshman').value = 0;
        }
    }
};
let sophomore = {
    number: [],
    check(){
        if(typeof(valueToInt('sophomore')) != "number" || document.getElementById('sophomore').value == ""){
            console.log(typeof(valueToInt('sophomore')));
            document.getElementById('sophomore').value = 0
        } else if (document.getElementById('sophomore').value<0){
            document.getElementById('sophomore').value = 0;
        }
    }
};
let junior = {
    number: [],
    check(){
        if(typeof(valueToInt('junior')) != "number" || document.getElementById('junior').value == ""){
            document.getElementById('junior').value = 0
        } else if (document.getElementById('junior').value<0){
            document.getElementById('junior').value = 0;
        }
    }
};
freshman.number.length = 35*12;
sophomore.number.length = 35*12;
junior.number.length = 35*12;

freshman.number.fill(0);
sophomore.number.fill(0);
junior.number.fill(0);

function valueToInt(id){
    return parseInt(document.getElementById(id).value);
}

function numberChanged(){
    freshman.check();
    sophomore.check();
    junior.check();
    document.getElementById('freshman').value = valueToInt('freshman');
    document.getElementById('sophomore').value = valueToInt('sophomore');
    document.getElementById('junior').value = valueToInt('junior');
}

let month = {
    value: 1,
    up(){
        document.getElementById('month').value++;
        dateChanged();
    },
    down(){
        document.getElementById('month').value--;
        dateChanged();
    },
    check(){
        if(document.getElementById('month').value>12){
            document.getElementById('month').value = 12;
        } else if (document.getElementById('month').value<1){
            document.getElementById('month').value = 1;
        }
    }
}

let week = {
    value: 1,
    up(){
        document.getElementById('week').value++;
        dateChanged();
    },
    down(){
        document.getElementById('week').value--;
        dateChanged();
    },
    check(){
        if(document.getElementById('week').value>5){
            document.getElementById('week').value = 5;
        } else if (document.getElementById('week').value<1){
            document.getElementById('week').value = 1;
        }
    }
}

let day = {
    value: 1,
    up(){
        document.getElementById('day').value++;
        dateChanged();
    },
    down(){
        document.getElementById('day').value--;
        dateChanged();
    },
    check(){
        if(document.getElementById('day').value>7){
            document.getElementById('day').value = 7;
        } else if (document.getElementById('day').value<1){
            document.getElementById('day').value = 1;
        }
    }
}

let count = 1;

function dayCount(){
    count = (month.value-1)*35+(week.value-1)*7+(day.value);
}

function indicateValue(){
    document.getElementById('indicator').innerHTML = 
    month.value.toString() + week.value.toString() + day.value.toString() + count 
    + "<br>" + "1학년: " + freshman.number[count-1] + "<br>" + "2학년: " + sophomore.number[count-1] + "<br>" + "3학년: " + junior.number[count-1] + "<br>";
}

function inputData() {
    dayCount();
    freshman.number[count-1] = document.getElementById('freshman').value;
    sophomore.number[count-1] = document.getElementById('sophomore').value;
    junior.number[count-1] = document.getElementById('junior').value;
    indicateValue();
    indicateStats();
}

function dateChanged(){
    month.check();
    week.check();
    day.check();
    document.getElementById('month').value = valueToInt('month');
    document.getElementById('week').value = valueToInt('week');
    document.getElementById('day').value = valueToInt('day');
    month.value = valueToInt('month');
    week.value = valueToInt('week');
    day.value = valueToInt('day');
    dayCount();
    indicateValue();
}

let calMonth = {
    value: 1,
    up(){
        document.getElementById('calMonth').value++;
        calDateChanged();
    },
    down(){
        document.getElementById('calMonth').value--;
        calDateChanged();
    },
    check(){
        if(document.getElementById('calMonth').value>12){
            document.getElementById('calMonth').value = 12;
        } else if (document.getElementById('calMonth').value<1){
            document.getElementById('calMonth').value = 1;
        }
    }
}

let calWeek = {
    value: 1,
    up(){
        document.getElementById('calWeek').value++;
        calDateChanged();
    },
    down(){
        document.getElementById('calWeek').value--;
        calDateChanged();
    },
    check(){
        if(document.getElementById('calWeek').value>5){
            document.getElementById('calWeek').value = 5;
        } else if (document.getElementById('calWeek').value<1){
            document.getElementById('calWeek').value = 1;
        }
    }
}

function monthlyUser(arr){
    let a = 0;
    let total = 0;
    let loss = 0;
    while(a<35){
        total += parseInt(arr[(calMonth.value-1)*35+a]);
        if(arr[(calMonth.value-1)*35+a] == 0){
            loss++;
        }
        a++;
    }
    console.log(total);
    console.log(a);
    console.log(loss);
    return total/(35-loss);
}

function mostPopularDay(arr){
    let a = 0;
    let howMuch = 0;
    let when = 0;
    while(a<35){
        if(arr[(calMonth.value-1)*35+a] > howMuch){
            howMuch = parseInt(arr[(calMonth.value-1)*35+a]);
            when = a;
        }
        a++;
    }
    if(howMuch == 0){
        return NaN;
    } else{
        return parseInt((when)/7) + 1 +"주차" + ((when)%7 + 1) + "일";
    }
}

function mostPopularDayTotal(){
    let a = 0;
    let howMuch = 0;
    let when = 0;
    while(a<35){
        if(freshman.number[(calMonth.value-1)*35+a]+sophomore.number[(calMonth.value-1)*35+a]+junior.number[(calMonth.value-1)*35+a] > howMuch){
            howMuch = parseInt(freshman.number[(calMonth.value-1)*35+a]+sophomore.number[(calMonth.value-1)*35+a]+junior.number[(calMonth.value-1)*35+a]);
            when = a;
        }
        a++;
    }
    if(howMuch == 0){
        return NaN;
    } else{
        return parseInt((when)/7) + 1 +"주차" + ((when)%7 + 1) + "일";
    }
}

function indicateStats(){
    document.getElementById('statsIndicator').innerHTML = 
    "<p>" + "#이번 달 배식받은 평균 인원" + "<br>"
    + "1학년: " + monthlyUser(freshman.number) +"<br>"
    + "2학년: " + monthlyUser(sophomore.number) + "<br>"
    + "3학년: " + monthlyUser(junior.number) + "<br>" 
    + "종합: " + (monthlyUser(freshman.number)+monthlyUser(sophomore.number)+monthlyUser(junior.number))/3 + "</p>"
    +"<p>" + "#이번 달 가장 많이 배식받은 날" + "<br>"
    + "1학년: " + mostPopularDay(freshman.number) +"<br>"
    + "2학년: " + mostPopularDay(sophomore.number) + "<br>"
    + "3학년: " + mostPopularDay(junior.number) + "<br>" 
    + "종합: " + mostPopularDayTotal() + "</p>"
    ;
}

function calDateChanged(){
    calMonth.check();
    calWeek.check();
    document.getElementById('calMonth').value = valueToInt('calMonth');
    document.getElementById('calWeek').value = valueToInt('calWeek');
    calMonth.value = valueToInt('calMonth');
    calWeek.value = valueToInt('calWeek');
    indicateStats();
}
