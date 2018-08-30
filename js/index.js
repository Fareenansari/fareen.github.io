(function() {
  var questions = [{
    question: "1.For 8 keys and 6 slots in a hashing table with uniform hashing and chaining, what is the expected number of items that hash to a particular location.",
    choices: ["2.33", "0.75"," 1.33","2"],
    correctAnswer:2
  }, {
    question: "2.For m keys and n slots in a hashing table, which of the following is the expected number of empty location.",
    choices: [" n((m-1)/m)^n", "m((m-1)/m)^n"," n((n-1)/m)^n", "n((n-1)/n)^m"],
    correctAnswer: 1
  }, {
    question: "3.What is the number of binary search trees with 20 nodes with elements 1, 2, 3,…..20 such that the root of tree is 12 and the root of left subtree is 7?",
    choices: [" 2634240", "1243561", "350016", "2642640"],
    correctAnswer: 3
  }, {
    question: "4.For a graph with E edges and V vertices what is the time complexity of Dijkstra algorithm using array as data structure for storing non-finalized vertices. Graph is undirected and represented as adjacency list?",
    choices: ["O(VE)","O(ElogV)","O(V^2 )","O(E^2log V)"],
    correctAnswer: 2
  }, {
    question: " Which of these best describes an array",
  choices: ["A data structure that shows a hierarchical behavior", "Container of objects of similar types"," Container of objects of mixed types", "  All of the mentioned"],
    correctAnswer: 1
  },{
   
    question: " When does the ArrayIndexOutOfBoundsException occur?",
    choices: ["Compile-time", "Run-time", " Not an error","None of the mentioned"],
    correctAnswer: 1
  },{
	    question: "  Process of inserting an element in stack is called ___________",
  choices: ["Create","Push","Evaluation","Pop"],
    correctAnswer: 1
	},{
	    question: "Pushing an element into stack already having five elements and stack size of 5 , then stack becomes",
  choices: ["overflow","crash","underflow", "user flow"],
    correctAnswer: 0
	},{
	    question:" What is the value of the postfix expression 6 3 2 4 + – *:",
  choices: ["Something between -5 and -15", " Something between 5 and -5"," Something between 5 and 15", " Something between 15 and 100"],
    correctAnswer: 3
 },{
	    question: "Which of the following is false about a doubly linked list?",
  choices: ["We can navigate in both the directions", "It requires more space than a singly linked list","The insertion and deletion of a node take a bit longer ", " None of the mentioned"],
    correctAnswer: 3
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