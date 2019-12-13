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

  me = { avatar: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTEwMjguNCkiPjxwYXRoIGQ9Im04LjQwNjIgMTA0MS4xYy0yLjg4NTYgMS4zLTQuOTc4MSA0LTUuMzQzNyA3LjMgMCAxLjEgMC44MzI5IDIgMS45Mzc1IDJoMTRjMS4xMDUgMCAxLjkzOC0wLjkgMS45MzgtMi0wLjM2Ni0zLjMtMi40NTktNi01LjM0NC03LjMtMC42NDkgMS4zLTIuMDExIDIuMy0zLjU5NCAyLjNzLTIuOTQ1My0xLTMuNTkzOC0yLjN6IiBmaWxsPSIjMmMzZTUwIi8+PHBhdGggZD0ibTE3IDRhNSA1IDAgMSAxIC0xMCAwIDUgNSAwIDEgMSAxMCAweiIgZmlsbD0iIzM0NDk1ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxMDMxLjQpIi8+PHBhdGggZD0ibTEyIDExYy0xLjI3NyAwLTIuNDk0MyAwLjI2OS0zLjU5MzggMC43NS0yLjg4NTYgMS4yNjItNC45NzgxIDMuOTk3LTUuMzQzNyA3LjI1IDAgMS4xMDUgMC44MzI5IDIgMS45Mzc1IDJoMTRjMS4xMDUgMCAxLjkzOC0wLjg5NSAxLjkzOC0yLTAuMzY2LTMuMjUzLTIuNDU5LTUuOTg4LTUuMzQ0LTcuMjUtMS4xLTAuNDgxLTIuMzE3LTAuNzUtMy41OTQtMC43NXoiIGZpbGw9IiMzNDQ5NWUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMTAyOC40KSIvPjwvZz48L3N2Zz4=" };

  bot = { avatar: "assets/images/bot.png" };

  constructor() {

  }

  ngOnInit() {
  }
  onKey(event: any) { // without type info
    this.insertChat("me", event.target.value, this.formatAMPM(new Date()));
    event.target.value = "";
  }
  chat() {

    $(".chatBox").show(1000);
    $(".hideBot").hide();
    this.resetChat();
    this.insertChat("bot", "Hello Suneel, Please choos any of the below options.", 100);
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
  insertChat(who, text, time: any = 0) {

    var control = "";
    var date = this.formatAMPM(new Date());
    let that = this;

    if (who == "me") {

      control = '<li style="width:100%">' +
        '<div class="msj macro">' +
        '<div class="avatar"><img class="img-circle" style="width:50%;" src="' + this.me.avatar + '" /></div>' +
        '<div class="text text-l">' +
        '<p>' + text + '</p>' +
        '<p><small>' + date + '</small></p>' +
        '</div>' +
        '</div>' +
        '</li>';
    } else {
      control = '<li style="width:100%;">' +
        '<div class="msj-rta macro">' +
        '<div class="text text-r">' +
        '<p>' + text + '</p>' +
        '<p><small>' + date + '</small></p>' +
        '</div>' +
        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' + this.bot.avatar + '" /></div>' +
        '</li>';
    }
    setTimeout(
      function () {
        $("#msg").append(control);
        if (who == "me") that.insertChat("bot", text, 1000);
        that.updateChatWindow();

      }, time);

  }
  resetChat() {
    $("#msg").empty();
  }
  updateChatWindow() {
    var height = $('#msg')[0].scrollHeight;
    var dheight = $('#msg').height();
    var scrolling = height - dheight;
    $('#msg').animate({scrollTop : scrolling},500);
  }

}
