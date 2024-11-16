const person = {
    firstName: 'Souharda',
    lastName: 'Biswas',
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
};


function showThis() {
    document.getElementById('normal-output').textContent = this.fullName();
}


function useCall() {
    const anotherPerson = { firstName: 'John', lastName: 'Doe' };
    document.getElementById('call-output').textContent = person.fullName.call(anotherPerson);
}


function useApply() {
    const anotherPerson = { firstName: 'Jane', lastName: 'Smith' };
    document.getElementById('apply-output').textContent = person.fullName.apply(anotherPerson);
}


function useBind() {
    const anotherPerson = { firstName: 'Alex', lastName: 'Johnson' };
    const boundFunction = person.fullName.bind(anotherPerson);
    document.getElementById('bind-output').textContent = boundFunction();
}


document.getElementById('normal-button').addEventListener('click', function() {
    showThis.call(person); 
});

document.getElementById('call-button').addEventListener('click', useCall);
document.getElementById('apply-button').addEventListener('click', useApply);
document.getElementById('bind-button').addEventListener('click', useBind);
