from typing import List, Dict, Any


class AbstractFormatter:
    def format_violations(self, violations): # type: (List[Dict[str, Any]]) -> str
        raise NotImplementedError