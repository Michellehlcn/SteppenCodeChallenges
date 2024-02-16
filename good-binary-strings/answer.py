
class largestGood(object):
    def __init__(self, s):
       
        # Check constrainst
        # each charater should be either 0 or 1
        # binString is a good string
        assert self._checkBinary(s),  "Invalid Binary String"
        assert self._checkGoodString(s), "Binstring is not good enough"
        
        self.value = self._sortString(s)

    def _checkBinary(self, s):
        # if the input string is empty, return an empty string.
        if s == '':
            return False
        
        p = set(s)
        str_ = {'0','1'}
        # if set p is same as set str_
        # or contains only either '0' or '1'
        if str_ == p or p == {'0'} or p == {'1'}:
            return True
        else:
            return False
        
    def _checkGoodString(self, s):
        # checkGoodString
        count_0 = 0
        count_1 = 0
        for char in s:
            if char == '0':
                count_0 += 1
            elif char == '1':
                count_1 += 1
        if count_0 == count_1:
            return True
        else:
            return False
    
    def _sortString (self, s: str) -> str:
       
        #print(">> BinString is a Binary String and a Good string.")
        #print(s)

        # intialize a list to store special characters
        strings = []
        cnt = 0
        start_index = 0

        for i in range(len(s)):
            # Increase count for '1', and decrease for '0
            cnt += 1 if s[i] == '1' else -1

            # when count is 0
            if cnt == 0:
                # recursive process by excluding the first and the last character, wrap with "1" and "0"
                inner_special = '1' + self._sortString(s[start_index +1: i]) + '0'
                strings.append(inner_special)

                start_index = i +1

        # sort the list of good binary string to get the largest number        
        strings.sort(reverse=True)
        return ''.join(strings)
    
if __name__ == '__main__':
    s = input(">> Please enter your number...:")
    try: 
        print("The lexicographically largest possible good string ", largestGood(s).value)
    except Exception as e:
        print(e)