#include <stdio.h>
#include <conio.h>
#include <windows.h>
#include <stdlib.h>
#include <time.h>

#define WIDTH 40
#define HEIGHT 20
#define MAX_SNAKE 100

typedef struct {
    int x, y;
} Point;

void gotoxy(int x, int y) {
    COORD pos = { x, y };
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), pos);
}

void hidecursor() {
    CONSOLE_CURSOR_INFO cursorInfo;
    cursorInfo.bVisible = FALSE;
    cursorInfo.dwSize = 1;
    SetConsoleCursorInfo(GetStdHandle(STD_OUTPUT_HANDLE), &cursorInfo);
}

int main() {
    hidecursor();
    Point snake[MAX_SNAKE];
    int snake_length = 5;
    int direction = 3; 
    int gameover = 0;

    
    for (int i = 0; i < snake_length; i++) {
        snake[i].x = WIDTH / 2 + i;
        snake[i].y = HEIGHT / 2;
    }

    Point food;
    srand(time(NULL));
    food.x = rand() % (WIDTH - 2) + 1;
    food.y = rand() % (HEIGHT - 2) + 1;

    while (!gameover) {
        
        system("cls");
        for (int y = 0; y <= HEIGHT; y++) {
            for (int x = 0; x <= WIDTH; x++) {
                if (y == 0 || y == HEIGHT || x == 0 || x == WIDTH) {
                    printf("#");
                }
                else if (x == food.x && y == food.y) {
                    printf("O");
                }
                else {
                    int printed = 0;
                    for (int k = 0; k < snake_length; k++) {
                        if (snake[k].x == x && snake[k].y == y) {
                            if (k == 0) printf("X");
                            else printf("x");
                            printed = 1;
                            break;
                        }
                    }
                    if (!printed) printf(" ");
                }
            }
            printf("\n");
        }

        
        if (_kbhit()) {
            int key = _getch();
            if (key == 224) { 
                key = _getch();
                
                if (key == 72 && direction != 2) direction = 0;
                else if (key == 77 && direction != 3) direction = 1;
                else if (key == 80 && direction != 0) direction = 2;
                else if (key == 75 && direction != 1) direction = 3;
            }
        }

        
        for (int i = snake_length - 1; i > 0; i--) {
            snake[i] = snake[i - 1];
        }
        if (direction == 0) snake[0].y--;
        else if (direction == 1) snake[0].x++;
        else if (direction == 2) snake[0].y++;
        else if (direction == 3) snake[0].x--;

        
        if (snake[0].x == 0 || snake[0].x == WIDTH || snake[0].y == 0 || snake[0].y == HEIGHT) {
            gameover = 1;
        }

        
        for (int i = 1; i < snake_length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                gameover = 1;
                break;
            }
        }

        
        if (snake[0].x == food.x && snake[0].y == food.y) {
            if (snake_length < MAX_SNAKE) snake_length++;
            food.x = rand() % (WIDTH - 2) + 1;
            food.y = rand() % (HEIGHT - 2) + 1;
        }

        Sleep(100);
    }

    system("cls");
    printf("이런 집게사장한테 잡혔네요: %d\n", snake_length - 5);

    return 0;
}