const subject = [
    "i",
    "my friend",
    "my mom",
    "my dad",
    "my brother",
    "my sister",
    "my neighbor",
    "my grandma",
    "my grandpa",
    "this guy I know",
    "this woman I know",
    "my dog",
    "my cat",
    "my sister's friend",
    "my brother's friend",
    "everyone I know",
    "nobody I know",
    "someone I know",
    "the mailman",
    "the company"
]

const verb = [
    "tried",
    "hated",
    "loved",
    "used",
    "tested",
    "broke",
    "lost",
    "found",
    "bought",
    "fixed",
    "ordered",
    "returned",
    "procured",
    "acquired",
    "destroyed",
    "tainted",
    "painted",
    "dropped",
    "picked up",
    "made",
]

const sentObject = [
    "this",
    "this thing",
    "one",
    "the item",
    "two of these",
    "a bunch of these",
    "a couple of these",
    "the packaging",
    "the receipt",
    "it",
    "some of it",
]

const adjectives = [
    "strong",
    "silly",
    "stupid",
    "clever",
    "dumb",
    "wonderful",
    "perfect",
    "clumsy",
    "goofy",
]

const callToAction = [
    "You need this!",
    "Shut up and take my money!",
    "Do. Not. Buy.",
    "I'm buying more soon.",
    "Would recommend.",
    "I would not recommend.",
    "This doesn't even make sense.",
    "I'm so gullible",
    "Buy two!",
    "Never again!",
    "I want a refund!",
    "I would pay double for this.",
    "You will not be dissapointed.",
    "You can never have enough of these.",
    "This was expensive.",
    "This was so cheap.",
    "When would I use one of these?",
    "Why wouldn't buy one?",
    "Why do you need one?",
    "The company sent me two.",
    "What is the point?",
    "YES YES YES!",
    "This is so weird.",
    "I just don't get it.",
    "Let me tell you...",
    "You won't be able use this.",
    "You won't believe it!"
]

function simpleSentenceMaker(newSentence = true, period = true) {
    let thisSubj = subject[Math.floor(Math.random() * subject.length)];
    if (newSentence) {
      const firstLetter = thisSubj.charAt(0).toUpperCase();
      thisSubj = `${firstLetter}${thisSubj.slice(1)}`;
    }
    if (thisSubj.length > 0) {
        if (Math.floor(Math.random() * 4) === 3) {
            const thisAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
            thisSubj.split(' ').splice(1, 0, thisAdj).join(' ');
        }
    }
    let thisVerb = verb[Math.floor(Math.random() * verb.length)];
    let thisSentObj = sentObject[Math.floor(Math.random() * sentObject.length)];

    let sentence = thisSubj.split(' ').concat(thisVerb.split(' '), thisSentObj.split(' ')).join(' ');

    if (period) {
        if (Math.floor(Math.random() * 4) === 3) {
            sentence = `${sentence}!`
        } else {
            sentence = `${sentence}.`
        }
    }
    return sentence;
}

function reviewWriter() {
    let review = [];
    let totalSentences = Math.floor(Math.random()*2) +1;
    let hasCTA = false;
    for (let i = 0; i < totalSentences; i++) {
      if (!hasCTA && i > 0) {
        review.push(callToAction[Math.floor(Math.random() * callToAction.length)]);
      } else if (i > 0) {
        review.push(simpleSentenceMaker());
      } else {
          if (Math.floor(Math.random() * 2)){
            review.push(callToAction[Math.floor(Math.random() * callToAction.length)]);
          } else {
            review.push(simpleSentenceMaker());
          }
      }
    }
    return review.join(' ');
}