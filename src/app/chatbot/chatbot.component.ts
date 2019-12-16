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
  msgInput=false;
  bot = { avatar: "assets/images/bot.png" };
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
    this.insertChat("bot", "Hello Suneel, Please choos any of the below options.", 1000, ["Whats your Name.", "Whats your Profession.","My Order details.","No answer"]);
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
    this.insertChat(who, text+"?", time);
    this.msgInput = false;
    switch (text) {
      case "Whats your Name.":
        this.insertChat("bot", "I AM your Personal Bot", 1000);
        break;
      case "Whats your Profession.":
        this.insertChat("bot", "Helping you.. :-)", 1000);
        break;
      case "My Order details.":
          this.insertChat("bot", "Please enter Order Number", 1000);
          this.msgInput = true;
          break;
      default:
        this.insertChat("bot", "I cant find that please choose bellow", 1000, ["Whats your Name.", "Whats your Profession.","My Order details."]);
    }
  }
  insertChat(who, text, delay: any = 0, questions = null) {
    var control = "";
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
