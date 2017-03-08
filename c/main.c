/*
 * =====================================================================================
 *
 *       Filename:  main.c
 *
 *    Description:  Examples from the 1972 K & R C book
 *
 *        Version:  1.0
 *        Created:  12/21/2016 12:31:11 PM
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  Rickey Visinski
 *   Organization:  Danbury IO Presentation
 *
 * =====================================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Example function exchanging integers in place
static inline void swapInt(int* i, int* j) {
  int tmp;

  tmp = *i;
  *i = *j;
  *j = tmp;
}

// Example function exchanging characters in place
static inline void swapChar(char* s, char* e) {
  char tmp;

  tmp = *s;
  *s = *e;
  *e = tmp;
}

// Helper function to display the array
static inline void printArr(int arr[], size_t len) {
  int i;
  for (i = 0; i < len; i++) {
    fprintf(stdout, "%d", arr[i]);
  }
  fprintf(stdout, "\n");
}

// Reverse the given arrays
// @arg Array to be reversed
// @arg Swap function to be used
// @arg Length of the array being reversed
// @arg size in bytes of object being reversed
void reverse(void* arr, void (*swap)(void*, void*), size_t len, size_t size) {
  int i, j;
  for (i = 0, j = len - 1; i < j; i++, j--) {
    (*swap)(arr + i * size, arr + j * size);
  }
}

int main(int argc, char** argv) {

  // Create the int Array
  int intArr[5] = {1, 2, 3, 4, 5};
  // sizof into on 64 bit systems is different than char
  size_t len = sizeof(intArr) / sizeof(int);

  // Display the before and after
  printArr(intArr, len);
  // Note the function signature
  reverse(intArr, (void (*)(void*, void*))swapInt, len, sizeof(int));
  printArr(intArr, len);

  // Character test case
  char test[] = "This is a test";

  // show the before and after
  fprintf(stdout, "%s\n", test);
  reverse(test, (void (*)(void*, void*))swapChar, strlen(test), sizeof(char));
  fprintf(stdout, "%s\n", test);

  return EXIT_SUCCESS;
}

