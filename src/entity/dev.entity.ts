import { uuid } from "https://deno.land/x/uuid@v0.1.2/v4.ts";

class Dev {
  private _props: DevProps;

  private constructor(props: DevProps) {
    this._props = props;
  }

  static build(props: DevBuildProps, id?: string) {
    return new Dev({
      ...props,
      id: id || uuid()
    });
  }

  somePoints(value: number) {
    this._props.points += value;
  }

  get id() {
    return this._props.id;
  }

  get props() {
    return this._props;
  }
}

type DevProps = {
  id: string;
  name: string;
  nickname: string;
  avatarUrl: string;
  points: number;
}
type DevBuildProps = Omit<DevProps, "id">;

export { Dev };