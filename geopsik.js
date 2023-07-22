// let storage = window.localStorage;
// window.localStorage.setItem('') 추후 이어 작성

/**
 * 목표 태그에 입력된 값이 최댓값, 최솟값을 벗어나거나 숫자가 아닐 경우 정정
 * @param {string} id 목표 태그의 id값
 * @param {number} min 최솟값
 * @param {number} max 최댓값
 */
function valueCheck(id, min, max){
    if(isNaN(valueToInt(id)) == true){
        document.getElementById(id).value = min;
    } else if (document.getElementById(id).value<min){
        document.getElementById(id).value = min;
    } else if(document.getElementById(id).value>max){
        document.getElementById(id).value = max;
    }
    
}

//학년별 인원 저장공간
let freshman = {
    number: [],
};
let sophomore = {
    number: [],
};
let junior = {
    number: [],
};

//인원 저장공간 크기 지정
freshman.number.length = 35*12;
sophomore.number.length = 35*12;
junior.number.length = 35*12;

//빈 공간을 0으로 초기화
freshman.number.fill(0);
sophomore.number.fill(0);
junior.number.fill(0);

//해당 id태그의 값을 정수로 변환해 출력
/**
 * html 태그의 value값을 정수로 반환
 * @param {string} id 타깃 html태그의 id
 * @returns 목표 태그의 value값을 정수화하여 반환
 */
function valueToInt(id){
    return parseInt(document.getElementById(id).value);
}


function numberChanged(){
    valueCheck('freshman', 0, Infinity);
    valueCheck('sophomore', 0, Infinity);
    valueCheck('junior', 0, Infinity);
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
    }
}

let count = 1;

function dayCount(){
    count = (month.value-1)*35+(week.value-1)*7+(day.value);
}

function indicateValue(){
    document.getElementById('indicator').innerHTML = 
    "1학년: " + freshman.number[count-1] + "<br>" + "2학년: " + sophomore.number[count-1] + "<br>" + "3학년: " + junior.number[count-1] + "<br>";
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
    valueCheck('month', 1, 12);
    valueCheck('week', 1, 5);
    valueCheck('day', 1, 7);
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
            howMuch = parseInt(freshman.number[(calMonth.value-1)*35+a])+parseInt(sophomore.number[(calMonth.value-1)*35+a])+parseInt(junior.number[(calMonth.value-1)*35+a]);
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
    valueCheck('calMonth', 1, 12);
    valueCheck('calWeek', 1, 5);
    document.getElementById('calMonth').value = valueToInt('calMonth');
    document.getElementById('calWeek').value = valueToInt('calWeek');
    calMonth.value = valueToInt('calMonth');
    calWeek.value = valueToInt('calWeek');
    indicateStats();
}

// indicateValue();
// indicateStats(); html로딩 된 이후에 실행할 방법 찾아 구현할 것