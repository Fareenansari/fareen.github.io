(function() {
  var questions = [{
    question: "Which of the following c code is used to create new node?",
    choices: ["ptr = (NODE*)malloc(sizeof(NODE));", "ptr = (NODE*)malloc(NODE);","ptr = (NODE*)malloc(sizeof(NODE*));","ptr = (NODE)malloc(sizeof(NODE));"],
    correctAnswer:0
  }, {
	  question: " The concatenation of two list can performed in O(1) time. Which of the following variation of linked list can be used?",
      choices: [" Singly linked list", " Doubly linked list"," Circular doubly linked list","Array implementation of list"],
      correctAnswer:2
  }, {
	  question: "With what data structure can a priority queue be implemented?",
      choices: ["Array", "List","Heap","All of the mentioned"],
      correctAnswer:3
  }, {
	  question: "Which of the following is not an application of priority queue?",
    choices: ["Huffman codes", "Interrupt handling in operating system","Undo operation in text editors","Bayesian spam filter"],
    correctAnswer:2
  }, {
	  question: " What is not a disadvantage of priority scheduling in operating systems?",
    choices: ["A low priority process might have to wait indefinitely for the CPU", "If the system crashes, the low priority systems may be lost permanently","Interrupt handling"," None of the mentioned"],
    correctAnswer:2
  }, {
	  question: " What is the time complexity to insert a node based on position in a priority queue?",
    choices: [" O(nlogn)", "O(logn)"," O(n)","O(n2)"],
    correctAnswer:2
  }, {
	  question: "In linked list implementation of queue, if only front pointer is maintained, which of the following operation take worst case linear time?",
    choices: ["Insertion","Deletion","To empty a queue","Both a and c"],
    correctAnswer:3
  }, {
	  question: "In linked list implementation of a queue, front and rear pointers are tracked. Which of these pointers will change during an insertion into a NONEMPTY queue?",
    choices: [" Only front pointer", " Both front and rear pointer","Only rear pointer","None of the mentioned"],
    correctAnswer:2
  }, {
	  question: "In case of insertion into a linked queue, a node borrowed from the __________ list is inserted in the queue.",
    choices: ["AVAIL","FRONT","REAR"," None of the mentioned"],
    correctAnswer:0
  }, {
	  question: "The essential condition which is checked before insertion in a linked queue is?",
    choices: ["Underflow", "Overflow","Front value","Rear value"],
    correctAnswer:1
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();