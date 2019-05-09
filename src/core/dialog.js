'use strict';

class Dialog extends Machine {

    constructor(id, className, description) {
        super(id, className, description);
    }

    static create(props) {
        return new Dialog(props.id, props.class, props.description, props.parent)
            .append('article')
            .display(props.display)
            .draggable(props.features.draggable)
            .exit(props.features.exit);
    }
}


/**
 * Dialog 
 *@author Domitille COQ--ETCHEGARAY
 */

const createMachineDialog = (props) => {
    let nbquestion = props.features.nbquestion;
    let id = `node_${props.id}`;
    console.log(id);



    let dialog = Dialog.create(props);
    dialog.element.className = "machine dialog";
    
    let container = document.createElement('div');
    container.id = 'question-container';
    let paragraph_question = document.createElement('p'); paragraph_question.appendChild(document.createTextNode(`Question : ${props.features.question}`));
    let paragraph_answer = document.createElement('p'); paragraph_answer.appendChild(document.createTextNode(`Answer ${props.features.answer}`));
    let input = document.createElement('input');
    input.id = `dialog-input${props.id}`;
    input.type = 'text';
    input.placeholder = 'Type the number of the answer';

    let submitbutton = document.createElement('button');
    submitbutton.id = 'button';
    submitbutton.textContent = "OK";
    submitbutton.type = "submit";
    submitbutton.onclick = () => {
        let val = document.getElementById(`dialog-input${props.id}`).value;
        console.log(val,dialog.exitCode);
        if(nbquestion == "last"){
            nextGame(val,dialog);
        }
        else{
            if (val === dialog.exitCode.toString()){
                triggerAction('onsucces',props);
            }
        }
    }
    dialog.element.appendChild(paragraph_question);
    dialog.element.appendChild(paragraph_answer);
    dialog.element.appendChild(input);
    dialog.element.appendChild(submitbutton);
    
    //Display issue
    if(nbquestion !== "1"){
        dialog.element.style.display="none";
    }
    console.log(dialog);

    return dialog;
};
