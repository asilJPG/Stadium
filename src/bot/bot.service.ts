import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./model/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botRepo: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}
  async start(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botRepo.findOne({
      where: { user_id: userId },
    });
    if (!user) {
      await this.botRepo.create({
        user_id: userId,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        username: ctx.from.username,
      });
      await ctx.reply(
        `Iltimos,<b>"Telefon raqamni yuborish"</b> tugmasini bosing`,
        {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("Telefon raqamni yuborish")],
          ])
            .oneTime()
            .resize(),
        }
      );
    } else if (!user.status) {
      await ctx.reply(
        `Iltimos,<b>"Telefon raqamni yuborish"</b> tugmasini bosing`,
        {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("Telefon raqamni yuborish")],
          ])
            .oneTime()
            .resize(),
        }
      );
    } else {
      await this.bot.telegram.sendChatAction(userId, "typing");
      await ctx.reply(
        "Bu bot orqali Stadium dasturi bilan muloqot ornatiladi",
        {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        }
      );
    }
  }
}
