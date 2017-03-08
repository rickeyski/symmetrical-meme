(ns ^:figwheel-always om-tut.core
    (:require [om.core :as om :include-macros true]
              [om.dom :as dom :include-macros true]
              [clojure.string :as string]))

(enable-console-print!)

;; define your app data so that it doesn't get over-written on reload

(extend-type string
    ICloneable
    (-clone [s] (js/String. s)))

(extend-type js/String
    ICloneable
    (-clone [s] (js/String. s))
    om/IValue
    (-value [s] (str s)))


(defn editable [text owner]
  (reify
    om/IInitState
    (init-state [_]
            {:editing false})
    om/IRenderState
    (render-state [_ {:keys [editing]}]
      (dom/li nil
        (dom/span #js {:style (display (not editing))} (om/value text))
        (dom/input
                  #js {:style (display editing)
                       :value (om/value text)
                       :onChange #(handle-change % text owner)
                       :onKeyDown #(when (= (.-key %) "Enter")
                                               (commit-change text owner))
                       :onBlur (fn [e] (commit-change text owner))})
        (dom/button
                    #js {:style (display (not editing))
                         :onClick #(om/set-state! owner :editing true)}
                    "Edit")))))


(defn people [data]
  (->> data
     :people
     (mapv (fn [x]
       (if (:classes x)
         (update-in x [:classes]
            (fn [cs] (mapv (:classes data) cs)))
          x)))))


(defn middle-name [{:keys [middle middle-initial]}]
  (cond
    middle (str " " middle)
    middle-initial (str " " middle-initial ".")))


(defn display-name [{:keys [first last] :as contact}]
    (str last ", " first (middle-name contact)))


(defn professor-view [professor owner]
  (reify
    om/IRender
    (render [_]
      (dom/li nil
        (dom/div nil (display-name professor))
        (dom/label nil "Classes")
        (apply dom/ul nil
          (map #(dom/li nil (om/value %)) (:classes professor)))))))


(defn student-view [student owner]
  (reify
    om/IRender
    (render [_]
            (dom/li nil (display-name student)))))


(defn classes-view [data owner]
  (reify
    om/IRender
    (render [_]
      (dom/div #js {:id "classes"}
        (dom/h2 nil "Classes")
        (apply dom/ul nil
          (om/build-all editable (vals (:classes data))))))))


(defn registry-view [data owner]
  (reify
    om/IRender
    (render [_]
      (dom/div #js {:id "registry"}
         (dom/h2 nil "Registry")
         (apply dom/ul nil
            (om/build-all entry-view (people data)))))))


(defmulti entry-view (fn [person _] (:type person)))

(defmethod entry-view :student
    [person owner] (student-view person owner))

(defmethod entry-view :professor
    [person owner] (professor-view person owner))


(defn display [show]
    (if show
          #js {}
          #js {:display "none"}))


(defn handle-change [e text owner]
    (om/transact! text (fn [_] (.. e -target -value))))


(defn commit-change [text owner]
    (om/set-state! owner :editing false))


(def app-state
  (atom
    {:people
      [{:type :student :first "Ben" :last "Bitdiddle" :email "benb@mit.edu"}
       {:type :student :first "Alyssa" :middle-initial "P" :last "Hacker"
               :email "aphacker@mit.edu"}
       {:type :professor :first "Gerald" :middle "Jay" :last "Sussman"
               :email "metacirc@mit.edu" :classes [:6001 :6946]}
       {:type :student :first "Eva" :middle "Lu" :last "Ator" :email "eval@mit.edu"}
       {:type :student :first "Louis" :last "Reasoner" :email "prolog@mit.edu"}
       {:type :professor :first "Hal" :last "Abelson" :email "evalapply@mit.edu"
               :classes [:6001]}]
      :classes
        {:6001 "The Structure and Interpretation of Computer Programs"
         :6946 "The Structure and Interpretation of Classical Mechanics"
         :1806 "Linear Algebra"}}))


(om/root registry-view app-state
           {:target (. js/document (getElementById "registry"))})


(om/root classes-view app-state
           {:target (. js/document (getElementById "classes"))})


(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
)
