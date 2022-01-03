import { Colors } from "../../style";

export class Solver {
  matrix: any = null;

  constructor(matrix: any) {
    this.matrix = matrix;
  }

  private possible = (y: number, x: number, num: number) => {
    const rows = this.matrix;
    const cols = this.matrix[y];
    const group = this.getGroup(y, x);
    let swt = true;

    rows.forEach((row: any) => {
      if (row[x].value === num) {
        swt = false;
      }
    });
    cols.forEach((col: any) => {
      if (col.value === num) {
        swt = false;
      }
    });
    group.forEach((val: any) => {
      if (val.value === num) {
        swt = false;
      }
    });
    return swt;
  };
  private getGroup = (y: number, x: number) => {
    const groupY = parseInt("" + y / 3, 10);
    const groupX = parseInt("" + x / 3, 10);

    const row1 = this.matrix[3 * groupY].slice(3 * groupX, 3 * groupX + 3);
    const row2 = this.matrix[3 * groupY + 1].slice(3 * groupX, 3 * groupX + 3);
    const row3 = this.matrix[3 * groupY + 2].slice(3 * groupX, 3 * groupX + 3);

    return [...row1, ...row2, ...row3];
  };

  private validate = () => {
    let x, y;

    for (y = 0; y < 9; y++) {
      for (x = 0; x < 9; x++) {
        if (this.matrix[y][x].value !== 0) {
          const num = this.matrix[y][x].value;

          this.matrix[y][x].value = 0;
          if (!this.possible(y, x, num)) {
            this.matrix[y][x].value = num;

            return false;
          } else {
            this.matrix[y][x].value = num;
          }
        }
      }
    }
    return true;
  };

  public solve = () => {
    let x, y, num;

    for (y = 0; y < 9; y++) {
      for (x = 0; x < 9; x++) {
        if (this.matrix[y][x].value === 0) {
          for (num = 1; num < 10; num++) {
            if (this.possible(y, x, num)) {
              this.matrix[y][x].value = num;
              this.matrix[y][x].color = Colors.TEXT_SECONDARY_COLOR;
              if (!this.solve()) {
                this.matrix[y][x].value = 0;
              } else {
                return true;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  public run = () => {
    if (this.validate()) {
      this.solve();
    } else {
      alert("Oops!!! Not a valid data!");
    }

    return this.matrix;
  };
}
