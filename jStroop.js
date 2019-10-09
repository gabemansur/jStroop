class Stroop {

  constructor(maxCount, testType) {

    this.validKeys = ['d', 'f', 'j', 'k'];

    this.colors = [
      '#f20a1d', // red
      '#07e31d', // green
      '#243cf2', // blue
      '#e6d705', // yellow
    ];

    this.colorKey = [
      'red', 'green', 'blue', 'yellow'
    ],

    this.smokingWords = [
      'tobacco',
      'drag',
      'cigarette',
      'smoke',
      'ashtray',
      'puff',
      'lighter',
      'inhale',
      'smoking',
      'nicotine',

      'charm',
      'dear',
      'devotion',
      'excited',
      'joke',
      'peace',
      'playful',
      'pleasant',
      'sweet',
      'thrilled',

      'annoy',
      'awful',
      'boredom',
      'complain',
      'cruel',
      'gloomy',
      'tearful',
      'sadness',
      'sinful',
      'slum',

      'fan',
      'fence',
      'folder',
      'notebook',
      'pile',
      'portion',
      'reported',
      'sewing',
      'shift',
      'stand'
    ];

    this.practiceWords = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
    ]

    this.autoAdvance;

    this.count = 0;
    this.maxCount = maxCount;

    if(testType == 'practice'){
      this.words = this.practiceWords;
    }

    else {
      this.words = this.smokingWords;
    }

    this.currentWord;
    this.currentColor;

    this.acceptInput;
    this.displayTime;

    this.responses = [];
  }

  start() {
    self = this;
    console.log("Stroop is starting");
    setTimeout(function() {
      self.next();
    }, 1500);
  }

  next() {
    clearTimeout(this.autoAdvance);
    this.acceptInput = true;
    if(this.count == this.maxCount) this.end();
    self = this;
    this.currentWord = this.newWord();
    this.currentColor = this.newColor();
    this.displayWord();
    // If no key is pressed
    this.autoAdvance = setTimeout(function() {
      self.newResponse(0, false);
      self.displayIncorrect();
      setTimeout(function() {
        self.next();
      }, 1000);
    }, 2000);
  }

  getResponse(e) {
    let correct;
    self = this;
    if(this.validKeys.includes(e.key) && this.acceptInput) {
      clearTimeout(this.autoAdvance);
      if(this.validKeys.indexOf(e.key) == this.currentColor){
        correct = true;
        this.newResponse(e.key, correct);
        this.next();
      }
      else {
        correct = false;
        this.displayIncorrect();
        this.acceptInput = false;
        setTimeout(function() {
          self.next();
        }, 1000);
        this.newResponse(e.key, correct);
      }
    }
  }

  newResponse(key, correct) {
    let r = {
      word: this.words[this.currentWord],
      color: this.colorKey[this.currentColor],
      time: new Date().getTime() - this.displayTime,
      keyPressed: key,
      correct: correct
    }

    this.responses.push(r);
  }

  newWord() {
    let newWord = Math.floor(Math.random() * Math.floor(this.words.length));
    while(this.currentWord == newWord) {
      newWord = Math.floor(Math.random() * Math.floor(this.words.length));
    }
    return newWord;
  }

  newColor() {
    let newColor = Math.floor(Math.random() * Math.floor(this.colors.length));
    while(this.currentColor == newColor) {
      newColor = Math.floor(Math.random() * Math.floor(this.colors.length));
    }
    return newColor;
  }

  displayIncorrect() {
    let word = jQuery('.word');
    word.text('X').css({'color':self.colors[0]});
  }

  displayWord() {
    this.count++;
    this.displayTime = new Date().getTime();
    let self = this;
    jQuery('#stroop').html($('<h1>', {class: 'word'}));
    let word = jQuery('.word');
    word.text('+');
    setTimeout(function() {
      word.text(self.words[self.currentWord]).css({'color':self.colors[self.currentColor]});
    }, 500);
  }

  end() {
    document.write(JSON.stringify(this.responses));
    console.log(JSON.stringify(this.responses));
  }

}
