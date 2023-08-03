import {
  Ctx,
  Update,
  Start,
  On,
  Hears,
  Command,
  Action,
} from "nestjs-telegraf";
import { BotService } from "./bot.service";
import { Context, Markup } from "telegraf";
import { Bot } from "./model/bot.model";

@Update()
export class BotUpdate {
  botRepo: any;
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    return this.botService.start(ctx);
  }
  // @On("contact") async onContact(ctx: Context) {
  //   if ("contact" in ctx.message) {
  //     const userId = ctx.from.id;
  //     const user = await this.botRepo.findOne({
  //       where: { user_id: userId },
  //     });
  //     if (!user) {
  //       ctx.reply(`Iltimos, <b>Start</b> tugmasini bosing!`, {
  //         parse_mode: "HTML",
  //         ...Markup.keyboard(["/start"]).oneTime().resize(),
  //       });
  //     } else if (ctx.message.contact.user_id != userId) {
  //       await ctx.reply("Iltimos, o'zingizni raqamingizni kiriting", {
  //         parse_mode: "HTML",
  //         ...Markup.keyboard([
  //           [Markup.button.contactRequest("Telefon raqamini yuborish")],
  //         ])
  //           .oneTime()
  //           .resize(),
  //       });
  //     } else {
  //       let phone: string;
  //       ctx.message.contact.phone_number[0] == "+"
  //         ? (phone = ctx.message.contact.phone_number)
  //         : (phone = "+" + ctx.message.contact.phone_number);
  //       await this.botRepo.update(
  //         {
  //           phone: phone,
  //           status: true,
  //         },
  //         {
  //           where: { user_id: userId },
  //         }
  //       );
  //       await ctx.reply(`Tabriklayman, ro'yxatdan o'tdingiz`, {
  //         parse_mode: "HTML",
  //         ...Markup.removeKeyboard(),
  //       });
  //     }
  //   }
  
  async
}











  ///////////////////////////////// ====================== 
  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message) {
  //     console.log(ctx.message.photo);
  //     // await ctx.reply()
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }
  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ("video" in ctx.message) {
  //     await ctx.reply(String(ctx.message.video.file_name));
  //     // vozvroshat name of video
  //   }
  // }
  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   if ("sticker" in ctx.message) {
  //     await ctx.reply("👌");
  //   }
  // }
  // @On("animation") // gif
  // async onAnumation(@Ctx() ctx: Context) {
  //   await ctx.reply("GIIF");
  // }
  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   if ("contact" in ctx.message) {
  //     await ctx.reply(String(ctx.message.contact.phone_number));
  //     await ctx.reply(String(ctx.message.contact.first_name));
  //     await ctx.reply(String(ctx.message.contact.last_name));
  //     await ctx.reply(String(ctx.message.contact.user_id));
  //   }
  // }
  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   if ("location" in ctx.message) {
  //     await ctx.reply(String(ctx.message.location.horizontal_accuracy));
  //     await ctx.reply(String(ctx.message.location.longitude));
  //     await ctx.reply(String(ctx.message.location.latitude));
  //   }
  // }
  // // telegram tolovlar uchun ishlatiladi
  // @On("invoice")
  // async onInVoice(@Ctx() ctx: Context) {
  //   if ("invoice" in ctx.message) {
  //     await ctx.reply(String(ctx.message.invoice.title));
  //   }
  // }
  // // voice message
  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message) {
  //     await ctx.reply(String(ctx.message.voice.duration));
  //     await ctx.reply(String(ctx.message.voice.file_size));
  //   }
  // }
  // // documents
  // @On("document")
  // async onDocument(@Ctx() ctx: Context) {
  //   if ("document" in ctx.message) {
  //     await ctx.reply(String(ctx.message.document.file_size));
  //     await ctx.reply(String(ctx.message.document.file_name));
  //   }
  // }
  // // vizitka
  // @On("venue")
  // async onVenue(@Ctx() ctx: Context) {
  //   if ("venue" in ctx.message) {
  //     await ctx.reply(String(ctx.message.venue.address));
  //   }
  // }
  // @Hears("hi")
  // async hears(@Ctx() ctx: Context) {
  //   await ctx.reply("qq");
  // }
  // @Command("info")
  // async info(@Ctx() ctx: Context) {
  //   await ctx.reply("Information");
  // }

  // @Command("inline_keyboard")
  // async inlineButton(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       { text: "Button 1", callback_data: "button1" },
  //       { text: "Button 2", callback_data: "button2" },
  //       { text: "Button 3", callback_data: "button3" },
  //     ],
  //     [{ text: "Button 4", callback_data: "button4" }],
  //     [{ text: "Button 5", callback_data: "button5" }],
  //   ];
  //   ctx.reply("Choose a inline button: ", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // @Action("button1")
  // async onActionButton1(@Ctx() ctx: Context) {
  //   ctx.reply("You pressed Button 1!");
  // }

  // @Command("main_keyboard")
  // async mainButton(@Ctx() ctx: Context) {
  //   ctx.reply("choose a main button:", {
  //     parse_mode: "HTML",
  //     ...Markup.keyboard([
  //       ["bir", "ikki", "uch"],
  //       ["tort"],
  //       [Markup.button.contactRequest("📞Send User Conact")],
  //       [Markup.button.locationRequest("⭕Send User Location")],
  //     ])
  //       .oneTime()
  //       .resize(), //resize delaet sinhron razmer pod telefon... oneTime uberaet buutoni
  //   });
  // }
  // @Hears("bir")
  // async onBirButton(@Ctx() ctx: Context) {
  //   ctx.reply("bir bosildi");
  // }
  // @Hears("ikki")
  // async onIkkiButton(@Ctx() ctx: Context) {
  //   ctx.reply("ikki bosildi");
  // }
}
