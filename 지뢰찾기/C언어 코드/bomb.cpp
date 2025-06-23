#include <iostream>
#include <vector>
#include <ctime>
#include <cstdlib>

using namespace std;

const int SIZE = 8;
const int MINES = 8;

vector<vector<char>> board(SIZE, vector<char>(SIZE, '_'));
vector<vector<char>> realBoard(SIZE, vector<char>(SIZE, '0'));

void initMines() {
    int placed = 0;
    while (placed < MINES) {
        int x = rand() % SIZE;
        int y = rand() % SIZE;
        if (realBoard[x][y] != '*') {
            realBoard[x][y] = '*';
            placed++;
        }
    }
}

int countMines(int x, int y) {
    int dx[] = { -1,-1,-1,0,0,1,1,1 };
    int dy[] = { -1,0,1,-1,1,-1,0,1 };
    int count = 0;
    for (int i = 0; i < 8; i++) {
        int nx = x + dx[i];
        int ny = y + dy[i];
        if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
            if (realBoard[nx][ny] == '*') count++;
        }
    }
    return count;
}

void printBoard() {
    cout << "  ";
    for (int i = 0; i < SIZE; ++i) cout << i << " ";
    cout << endl;

    for (int i = 0; i < SIZE; ++i) {
        cout << i << " ";
        for (int j = 0; j < SIZE; ++j) {
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
}

int main() {
    srand(time(0));
    initMines();

    int x, y, opened = 0;
    while (true) {
        printBoard();
        cout << "좌표 입력 (x y): ";
        cin >> x >> y;

        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) {
            cout << "잘못된 입력입니다\n";
            continue;
        }

        if (board[x][y] != '_') {
            cout << "이미 열린 칸입니다.\n";
            continue;
        }

        if (realBoard[x][y] == '*') {
            cout << "GAME OVER\n";
            break;
        }

        int count = countMines(x, y);
        board[x][y] = '0' + count;
        opened++;

        if (opened == SIZE * SIZE - MINES) {
            cout << "무사히 통과하셨습니다!\n";
            break;
        }
    }

    cout << "\n정답 :\n";
    for (int i = 0; i < SIZE; ++i) {
        for (int j = 0; j < SIZE; ++j) {
            cout << realBoard[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}