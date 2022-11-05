const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document. querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation - "";
    }

    //adicionar digito na tla da calculadora
    addDigit(digit) {
        ///verificar se a tela ou não
        if(digit === "." && this.currentOperationText.innerText.includes (".")){
             return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //Todos operações da calculadora
    processOperation(operation) {
        //verificar se current está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            //mudar operação
            if(previousOperationText.innerText !== "") {
            this.changerOperation(operation);
        }
        return;
    }
        //pegar  valores dos textos inseridos
        let operationValue;
        const previous = +this.priviousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualsOperation();
                break;
            default: 
                return;
        }
    }

    //mudar valores na tela da calculadora
    updateScreen( 
        operationValue = null,
        operation = null,
        current = null,
        previous = null
        ) {
            
            if(operationValue === null) {
                this.currentOperationText.innerText += this.currentOperation;
            } else {
                //checar se o valor é zero,se for, colocar o valor atual 
            if(previous === 0){
                operationValue = current;
            }

            ///adicionar valor atual no valo anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";

        }   
    }

      //mudar operação matemática
    changerOperation(operation) {

    const mathOperations = ["*", "/", "+", "-"]

     if(mathOperations.includes(operation)) {
         return;
    }

     this.previousOperationText.innerText = this.previousOperationText.innerText.slice (0, -1) + operation;
    }
    //deletar ultimo digito
    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    //limpar operação atual 
    processClearCurrentOperation() {
     this.currentOperationText.innerText =""; 
    }
   //limpar todos os valores
    processClearOperation() {
        this.currentOperationText.innerText =""; 
        this.previousOperationText.innerText = ""; 
    }
    //mostrar resultado final 
    processEqualsOperation() {
        const operation = this.previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);


    }

}

     const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach ((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >=0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value)
        }
    });
});

window.addEventListener("keydown", (e) => {
    const value = e.key;

 if(+value >= 0 || value === ".") {
     calc.addDigit(value);
} else {
    calc.processOperation(value);
}

if(value == "Enter") {
    calc.processOperation("=");
    calc.processEqualsOperation();
}

if(value == "backspace") {
    calc.processOperation("DEL");
    calc.processEqualsOperation();
}

if(value == "backspace") {
    calc.processOperation("CE");
    calc.processEqualsOperation();
    }

});