(function() {
  var questions = [{
    question: " What is a memory efficient double linked list?",
    choices: ["Each node has only one pointer to traverse the list back and forth","The list has breakpoints for faster traversal","An auxiliary singly linked list acts as a helper list to traverse through the doubly linked list","None of the mentioned"],
    correctAnswer:0
  }, {
	   question: "How do you calculate the pointer difference in a memory efficient double linked list?",
    choices: [" head xor tail", " pointer to previous node xor pointer to next node","pointer to previous node – pointer to next node","pointer to next node – pointer to previous node"],
    correctAnswer:1
  }, {
	   question: "What is the time complexity of inserting a node in a doubly linked list?",
    choices: ["O(nlogn)", "O(nlogn)"," O(n)","O(1)"],
    correctAnswer:2
  }, {
	   question: "A linear list of elements in which deletion can be done from one end (front) and insertion can take place only at the other end (rear) is known as a ?",
    choices: ["queue","stack","tree","linked list"],
    correctAnswer:0
  }, {
	   question: " The data structure required for Breadth First Traversal on a graph is?",
    choices: ["Stack","Array","Tree","Queue"],
    correctAnswer:2
  }, {
	   question: "A queue is a ?",
    choices: ["FIFO (First In First Out) list", "LIFO (Last In First Out) list","Ordered array","Linear tree"],
    correctAnswer:0
  }, {
	   question: " In Breadth First Search of Graph, which of the following data structure is used?",
    choices: ["Stack", "Queue","Linked list","None of the mentioned"],
    correctAnswer:2
  }, {
	   question: "If the elements “A”, “B”, “C” and “D” are placed in a queue and are deleted one at a time, in what order will they be removed?",
    choices: ["ABCD","DCBA","DCAB","ABCD"],
    correctAnswer:0
  }, {
	   question: " A data structure in which elements can be inserted or deleted at/from both the ends but not in the middle is?",
    choices: ["Queue", "Circular queue","Dequeue","Priority queue"],
    correctAnswer:2
  }, {
	   question: " What would be the asymptotic time complexity to add an element in the linked list?",
    choices: ["O(1)", "O(n)","O(n2)","None of the mentioned"],
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