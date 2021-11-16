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

  public solve = () => {
    for (var y = 0; y < 9; y++) {
      for (var x = 0; x < 9; x++) {
        if (this.matrix[y][x].value === 0) {
          for (var num = 1; num < 10; num++) {
            if (this.possible(y, x, num)) {
              this.matrix[y][x].value = num;
              this.matrix[y][x].color = "grey";
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
    this.solve();

    return this.matrix;
  };
}
