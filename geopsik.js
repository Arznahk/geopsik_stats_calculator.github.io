// let storage = window.localStorage;
// window.localStorage.setItem('') ���� �̾� �ۼ�

/**
 * ��ǥ �±׿� �Էµ� ���� �ִ�, �ּڰ��� ����ų� ���ڰ� �ƴ� ��� ����
 * @param {string} id ��ǥ �±��� id��
 * @param {number} min �ּڰ�
 * @param {number} max �ִ�
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

//�г⺰ �ο� �������
let freshman = {
    number: [],
};
let sophomore = {
    number: [],
};
let junior = {
    number: [],
};

//�ο� ������� ũ�� ����
freshman.number.length = 35*12;
sophomore.number.length = 35*12;
junior.number.length = 35*12;

//�� ������ 0���� �ʱ�ȭ
freshman.number.fill(0);
sophomore.number.fill(0);
junior.number.fill(0);

//�ش� id�±��� ���� ������ ��ȯ�� ���
/**
 * html �±��� value���� ������ ��ȯ
 * @param {string} id Ÿ�� html�±��� id
 * @returns ��ǥ �±��� value���� ����ȭ�Ͽ� ��ȯ
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
    "1�г�: " + freshman.number[count-1] + "<br>" + "2�г�: " + sophomore.number[count-1] + "<br>" + "3�г�: " + junior.number[count-1] + "<br>";
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
        return parseInt((when)/7) + 1 +"����" + ((when)%7 + 1) + "��";
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
        return parseInt((when)/7) + 1 +"����" + ((when)%7 + 1) + "��";
    }
}

function indicateStats(){
    document.getElementById('statsIndicator').innerHTML = 
    "<p>" + "#�̹� �� ��Ĺ��� ��� �ο�" + "<br>"
    + "1�г�: " + monthlyUser(freshman.number) +"<br>"
    + "2�г�: " + monthlyUser(sophomore.number) + "<br>"
    + "3�г�: " + monthlyUser(junior.number) + "<br>" 
    + "����: " + (monthlyUser(freshman.number)+monthlyUser(sophomore.number)+monthlyUser(junior.number))/3 + "</p>"
    +"<p>" + "#�̹� �� ���� ���� ��Ĺ��� ��" + "<br>"
    + "1�г�: " + mostPopularDay(freshman.number) +"<br>"
    + "2�г�: " + mostPopularDay(sophomore.number) + "<br>"
    + "3�г�: " + mostPopularDay(junior.number) + "<br>" 
    + "����: " + mostPopularDayTotal() + "</p>"
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
// indicateStats(); html�ε� �� ���Ŀ� ������ ��� ã�� ������ ��