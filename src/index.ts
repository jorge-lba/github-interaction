import { DB } from "./adapter/db.firebase.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Dev } from "./entity/dev.entity.ts";

const PORT = Deno.env.get("PORT");
const port = PORT ? parseInt(PORT) : 8080;

const app = new Application();
const router = new Router();

const db = new DB();

router
  .post("/devs", async (ctx) => {
    const { name, nickname, avatarUrl } = await ctx.request.body()
      .value;
    const dev = Dev.build({
      name,
      nickname,
      avatarUrl,
      points: 0,
    });

    const devAlreadyExists = await db.findDevByNickname(dev.props.nickname);
    if (devAlreadyExists) {
      ctx.response.body = JSON.stringify({
        error: "Dev already exists",
      });
      ctx.response.headers.set("Content-Type", "application/json");
      ctx.response.status = 409;
      return;
    }

    await db.saveDev(dev);

    ctx.response.body = JSON.stringify(dev.props);
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.status = 201;
  })
  .get("/devs", async (ctx) => {
    const devs = await db.listDevs();

    ctx.response.body = JSON.stringify(devs.map((dev) => dev.props));
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.status = 200;
  })
  .get("/devs/rank", async (ctx) => {
    const devs = await db.rankDevs();

    ctx.response.body = JSON.stringify(devs.map((dev) => dev.props));
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.status = 200;
  })
  .get("/devs/:nickname", async (ctx) => {
    const { nickname } = ctx.params;
    const dev = await db.findDevByNickname(nickname);

    ctx.response.body = JSON.stringify(dev.props);
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.status = 200;
  })
  .patch("/devs/:nickname/set-points", async (ctx) => {
    const { nickname } = ctx.params;
    const { points } = await ctx.request.body().value;

    const dev = await db.findDevByNickname(nickname);
    dev.somePoints(points);

    await db.saveDev(dev);

    ctx.response.body = JSON.stringify(dev.props);
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.status = 200;
  })
  .post("/github", async (ctx) => {
    const {
      name,
      status,
      conclusion,
      actor: {
        login,
        avatar_url,
      }
    } = (await ctx.request.body().value).workflow_run;

    console.log(JSON.stringify({
      name,
      status,
      conclusion,
      actor: {
        login,
        avatar_url,
      }
    }));
    ctx.response.status = 200;
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", () => {});

await app.listen({ port });
