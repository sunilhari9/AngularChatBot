import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatbotComponent implements OnInit {
  title = 'IPM CHAT POC';

  me = { avatar: "assets/images/me.png" };
  msgInput = false;
  bot = { avatar: "assets/images/chatBotIcon.png" };
  chatMsgs: Array<object> = [];

  constructor() { }
  ngOnInit() { }
  onKey(event: any) { // without type info
    this.requested("me", event.target.value, this.formatAMPM(new Date()));
    event.target.value = "";
  }
  chat() {
    $(".chatBox").show(1000);
    $(".hideBot").hide();
    this.resetChat();
    this.insertChat("bot", "Hello Suneel, Its 32 \xB0C Altanta.",100);
    this.insertChat("bot", "What can I do for you Today?", 1000, ["Get my critical parameter.", "What are my today’s action items.", "Maintenance due this week.", "My work orders.", "No answer"]);
  }
  closeChat() {
    $(".chatBox").hide(1000);
    $(".hideBot").show(100);
  }
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  //-- No use time. It is a javaScript effect.
  requested(who, text, time: any = 0) {
    var that = this;
    this.insertChat(who, text, time);
    this.msgInput = false;
    switch (text) {
      case "What are my today’s action items.":
        this.insertChat("bot", "Please wait a moment its still progress", 1000);
        break;
      case "Get my critical parameter.":
        this.insertList("Its always a good idea to use critical parameter .here are your action items.", ["1) Call Customer", "2) Get my work done"], ["OK","Close"]);
        break;
      case "Maintenance due this week.":
        this.insertList("On time maintenance can save lot of money.here on your maintenance task for this week.", ["1) Fix Bugs", "2) Call Police"], ["OK","Close"]);
        break;
      case "My work orders.":
        this.insertChat("bot", "Please enter Order Number", 100);
        this.msgInput = true;
        break;
      case "OK":
        this.insertChat("bot", "Do you want to", 100,["Continue","Close"]);
        break;
      case "Close":
         this.closeChat();
      default:
        this.insertChat("bot", "Please choose from List.", 1000, ["Get my critical parameter.", "What are my today’s action items.", "Maintenance due this week.", "My work orders."]);
    }
  }
  insertChat(who, text, delay: any = 0, questions = null) {

    var date = this.formatAMPM(new Date());
    let that = this;
    setTimeout(
      function () {
        // $("#msg").append(control);
        if (who == "me") {
          that.chatMsgs.push({ avatar: that.me.avatar, who: "me", text: text, time: date });
        } else {
          if (questions && who == "bot") {
            that.chatMsgs.push({ avatar: that.bot.avatar, who: "bot", text: text, time: date, questions: questions });
          } else {
            that.chatMsgs.push({ avatar: that.bot.avatar, who: "bot", text: text, time: date });
          }
        }

        that.updateChatWindow();

      }, delay);
  }

  insertList(text, list, questions, delay: any = 1000) {
    let that = this;
    var date = this.formatAMPM(new Date());
    setTimeout(function () {
      that.chatMsgs.push({ avatar: that.bot.avatar, who: "bot", text: text, time: date, type: "list", list: list, questions: questions });
    }, delay);
  }

  resetChat() {
    this.chatMsgs = [];
  }
  updateChatWindow() {
    var height = $('#msg')[0].scrollHeight;
    var dheight = $('#msg').height();
    var scrolling = height - dheight;
    $('#msg').animate({ scrollTop: scrolling }, 500);
  }

}
