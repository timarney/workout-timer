import { secondsToMinutes, minutesToSeconds } from "../util/timeConversion";

describe("converts time", () => {
  it("should covert to minutes", () => {
    expect(secondsToMinutes(180)).toBe("03:00");
  });

  it("should covert to seconds", () => {
    expect(minutesToSeconds("2:20")).toBe(140);
  });
});
